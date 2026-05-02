import { BadRequestException, Injectable } from "@nestjs/common";
import { ArtistsService } from "../artists/artists.service";
import { throwIfSupabaseError } from "../common/database-error";
import { SupabaseService } from "../common/supabase.service";
import { InstagramService } from "../instagram/instagram.service";
import { CreateReelDto } from "./dto";

@Injectable()
export class ReelsService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly artists: ArtistsService,
    private readonly instagram: InstagramService
  ) {}

  async list() {
    const { data, error } = await this.supabase.client
      .from("reels")
      .select("*, artists(id,name,instagram_handle,permission_status)")
      .order("created_at", { ascending: false });

    throwIfSupabaseError(error, "Unable to list reels");
    return data;
  }

  async create(dto: CreateReelDto) {
    await this.validateRights(dto);

    const { data, error } = await this.supabase.client
      .from("reels")
      .insert({ ...dto, status: "draft" })
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to create reel");
    return data;
  }

  async approve(id: string) {
    const reel = await this.findById(id);
    await this.validateRights(reel as CreateReelDto);

    const { data, error } = await this.supabase.client
      .from("reels")
      .update({ status: "approved" })
      .eq("id", id)
      .in("status", ["draft", "pending_approval"])
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to approve reel");
    return data;
  }

  async schedule(id: string, scheduledAt: string) {
    const reel = await this.findById(id);
    await this.validatePublishable(reel);

    if (reel.status !== "approved") {
      throw new BadRequestException("Only approved reels can be scheduled");
    }

    const instagramPost = await this.instagram.createOrPublish({
      type: "reel",
      caption: String(reel.caption),
      media_url: String(reel.video_url),
      scheduled_at: scheduledAt
    });

    const { data, error } = await this.supabase.client
      .from("reels")
      .update({
        status: "scheduled",
        scheduled_at: scheduledAt,
        instagram_media_id: instagramPost.id
      })
      .eq("id", id)
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to schedule reel");
    return data;
  }

  async publish(id: string) {
    const reel = await this.findById(id);
    await this.validatePublishable(reel);

    if (!["approved", "scheduled", "failed"].includes(String(reel.status))) {
      throw new BadRequestException("Reel must be approved or scheduled before publishing");
    }

    const post = reel.instagram_media_id
      ? await this.instagram.publishPost(String(reel.instagram_media_id))
      : await this.instagram.createOrPublish({
          type: "reel",
          caption: String(reel.caption),
          media_url: String(reel.video_url)
        });

    const { data, error } = await this.supabase.client
      .from("reels")
      .update({
        status: "published",
        instagram_media_id: post.id,
        scheduled_at: null
      })
      .eq("id", id)
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to update reel after publish");
    return data;
  }

  async publishDueReels(now = new Date()) {
    const { data, error } = await this.supabase.client
      .from("reels")
      .select("*")
      .eq("status", "scheduled")
      .lte("scheduled_at", now.toISOString())
      .limit(10);

    throwIfSupabaseError(error, "Unable to fetch scheduled reels");

    const results = [];
    for (const reel of data ?? []) {
      try {
        results.push(await this.publish(String(reel.id)));
      } catch (error) {
        results.push({ id: reel.id, status: "failed", error: error instanceof Error ? error.message : String(error) });
      }
    }

    return results;
  }

  private async validateRights(reel: CreateReelDto) {
    if (reel.source_type === "embed") {
      return;
    }

    if (reel.source_type === "authorized") {
      if (!reel.artist_id) {
        throw new BadRequestException("Authorized reels require an artist_id");
      }
      await this.artists.assertApproved(reel.artist_id);
    }
  }

  private async validatePublishable(reel: Record<string, unknown>) {
    if (reel.source_type === "embed") {
      throw new BadRequestException("Embedded content cannot be republished to Instagram");
    }

    if (reel.source_type === "authorized") {
      await this.artists.assertApproved(String(reel.artist_id));
    }
  }

  private async findById(id: string) {
    const { data, error } = await this.supabase.client
      .from("reels")
      .select("*")
      .eq("id", id)
      .single();

    throwIfSupabaseError(error, "Unable to find reel");
    return data;
  }
}
