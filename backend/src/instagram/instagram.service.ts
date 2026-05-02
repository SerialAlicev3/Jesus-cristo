import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InstagramPostType } from "../common/app.types";
import { throwIfSupabaseError } from "../common/database-error";
import { SupabaseService } from "../common/supabase.service";
import { CreateInstagramPostDto } from "./dto";

export interface InstagramGraphResponse {
  id?: string;
  status_code?: string;
  error?: {
    message?: string;
  };
}

@Injectable()
export class InstagramService {
  private readonly graphVersion: string;
  private readonly accountId: string;
  private readonly accessToken: string;

  constructor(
    config: ConfigService,
    private readonly supabase: SupabaseService
  ) {
    this.graphVersion = config.get<string>("INSTAGRAM_GRAPH_VERSION", "v21.0");
    this.accountId = config.get<string>("INSTAGRAM_BUSINESS_ACCOUNT_ID", "");
    this.accessToken = config.get<string>("INSTAGRAM_ACCESS_TOKEN", "");
  }

  async createOrPublish(dto: CreateInstagramPostDto) {
    const status = dto.scheduled_at ? "scheduled" : "approved";
    const { data, error } = await this.supabase.client
      .from("instagram_posts")
      .insert({
        type: dto.type,
        caption: dto.caption,
        media_url: dto.media_url,
        status,
        scheduled_at: dto.scheduled_at ?? null
      })
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to create Instagram post");

    if (dto.scheduled_at) {
      return data;
    }

    return this.publishPost(String(data.id));
  }

  async list() {
    const { data, error } = await this.supabase.client
      .from("instagram_posts")
      .select("*")
      .order("scheduled_at", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    throwIfSupabaseError(error, "Unable to list Instagram posts");
    return data ?? [];
  }

  async publishPost(id: string) {
    const post = await this.findPost(id);
    if (!["approved", "scheduled", "failed"].includes(String(post.status))) {
      throw new BadRequestException("Post must be approved, scheduled, or failed before publishing");
    }

    await this.markPost(id, "publishing");

    try {
      const creation = await this.createContainer(post.type as InstagramPostType, String(post.media_url), String(post.caption));
      if (!creation.id) {
        throw new InternalServerErrorException("Instagram did not return a creation id");
      }

      const published = await this.publishContainer(creation.id);
      await this.logAttempt(id, "success", { creation, published });

      const { data, error } = await this.supabase.client
        .from("instagram_posts")
        .update({
          status: "published",
          published_at: new Date().toISOString(),
          response: { creation, published }
        })
        .eq("id", id)
        .select()
        .single();

      throwIfSupabaseError(error, "Unable to update Instagram post after publish");
      return data;
    } catch (error) {
      await this.logAttempt(id, "failed", this.serializeError(error));
      await this.supabase.client.rpc("increment_instagram_retry", { post_id: id });
      throw error;
    }
  }

  async publishDuePosts(now = new Date()) {
    const { data, error } = await this.supabase.client
      .from("instagram_posts")
      .select("*")
      .eq("status", "scheduled")
      .lte("scheduled_at", now.toISOString())
      .lt("retry_count", 3)
      .limit(10);

    throwIfSupabaseError(error, "Unable to fetch scheduled Instagram posts");

    const results = [];
    for (const post of data ?? []) {
      try {
        results.push(await this.publishPost(String(post.id)));
      } catch (error) {
        results.push({ id: post.id, status: "failed", error: this.serializeError(error) });
      }
    }

    return results;
  }

  async status(id: string) {
    this.assertGraphConfigured();

    const params = new URLSearchParams({
      fields: "status_code",
      access_token: this.accessToken
    });

    return this.graphGet<InstagramGraphResponse>(`${id}?${params.toString()}`);
  }

  private async createContainer(type: InstagramPostType, mediaUrl: string, caption: string) {
    this.assertGraphConfigured();

    const params = new URLSearchParams({ caption, access_token: this.accessToken });

    if (type === "reel") {
      params.set("media_type", "REELS");
      params.set("video_url", mediaUrl);
    } else {
      params.set("image_url", mediaUrl);
    }

    return this.graphPost<InstagramGraphResponse>(`${this.accountId}/media`, params);
  }

  private async publishContainer(creationId: string) {
    this.assertGraphConfigured();

    const params = new URLSearchParams({
      creation_id: creationId,
      access_token: this.accessToken
    });

    return this.graphPost<InstagramGraphResponse>(`${this.accountId}/media_publish`, params);
  }

  private async graphGet<T>(path: string): Promise<T> {
    const response = await fetch(`https://graph.facebook.com/${this.graphVersion}/${path}`);
    const body = (await response.json()) as InstagramGraphResponse;

    if (!response.ok || body.error) {
      throw new InternalServerErrorException(body.error?.message ?? "Instagram Graph API request failed");
    }

    return body as T;
  }

  private async graphPost<T>(path: string, params: URLSearchParams): Promise<T> {
    const response = await fetch(`https://graph.facebook.com/${this.graphVersion}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });
    const body = (await response.json()) as InstagramGraphResponse;

    if (!response.ok || body.error) {
      throw new InternalServerErrorException(body.error?.message ?? "Instagram Graph API request failed");
    }

    return body as T;
  }

  private async findPost(id: string) {
    const { data, error } = await this.supabase.client
      .from("instagram_posts")
      .select("*")
      .eq("id", id)
      .single();

    throwIfSupabaseError(error, "Unable to find Instagram post");
    return data;
  }

  private async markPost(id: string, status: string) {
    const { error } = await this.supabase.client.from("instagram_posts").update({ status }).eq("id", id);
    throwIfSupabaseError(error, "Unable to update Instagram post status");
  }

  private async logAttempt(instagramPostId: string, status: string, response: unknown) {
    const { error } = await this.supabase.client.from("publication_logs").insert({
      instagram_post_id: instagramPostId,
      channel: "instagram",
      status,
      response
    });

    throwIfSupabaseError(error, "Unable to log publication attempt");
  }

  private serializeError(error: unknown) {
    if (error instanceof Error) {
      return { name: error.name, message: error.message };
    }

    return { message: String(error) };
  }

  private assertGraphConfigured() {
    if (!this.accountId || !this.accessToken) {
      throw new BadRequestException("Instagram Graph API is not configured");
    }
  }
}
