import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ContentStatus } from "../common/app.types";
import { throwIfSupabaseError } from "../common/database-error";
import { SupabaseService } from "../common/supabase.service";
import { CreateMessageDto } from "./dto";

@Injectable()
export class MessagesService {
  constructor(private readonly supabase: SupabaseService) {}

  async today() {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await this.supabase.client
      .from("messages")
      .select("*")
      .eq("status", "published")
      .gte("publish_date", `${today}T00:00:00.000Z`)
      .lte("publish_date", `${today}T23:59:59.999Z`)
      .order("publish_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    throwIfSupabaseError(error, "Unable to fetch today's message");
    return data;
  }

  async list() {
    const { data, error } = await this.supabase.client
      .from("messages")
      .select("*")
      .order("publish_date", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    throwIfSupabaseError(error, "Unable to list messages");
    return data ?? [];
  }

  async create(dto: CreateMessageDto, status: ContentStatus = "draft") {
    const { data, error } = await this.supabase.client
      .from("messages")
      .insert({ ...dto, status })
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to create message");
    return data;
  }

  async approve(id: string) {
    const { data, error } = await this.supabase.client
      .from("messages")
      .update({ status: "approved" })
      .eq("id", id)
      .in("status", ["draft", "pending_approval"])
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to approve message");
    return data;
  }

  async schedule(id: string, publishDate: string) {
    const current = await this.findById(id);
    if (current.status !== "approved") {
      throw new BadRequestException("Only approved messages can be scheduled");
    }

    const { data, error } = await this.supabase.client
      .from("messages")
      .update({ status: "scheduled", publish_date: publishDate })
      .eq("id", id)
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to schedule message");
    return data;
  }

  async publishScheduled(now = new Date()) {
    const { data, error } = await this.supabase.client
      .from("messages")
      .update({ status: "published" })
      .eq("status", "scheduled")
      .lte("publish_date", now.toISOString())
      .select();

    throwIfSupabaseError(error, "Unable to publish scheduled messages");
    return data ?? [];
  }

  private async findById(id: string) {
    const { data, error } = await this.supabase.client
      .from("messages")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      throw new NotFoundException("Message not found");
    }

    return data;
  }
}
