import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ArtistPermissionStatus } from "../common/app.types";
import { throwIfSupabaseError } from "../common/database-error";
import { SupabaseService } from "../common/supabase.service";
import { CreateArtistDto } from "./dto";

@Injectable()
export class ArtistsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list() {
    const { data, error } = await this.supabase.client
      .from("artists")
      .select("*")
      .order("created_at", { ascending: false });

    throwIfSupabaseError(error, "Unable to list artists");
    return data;
  }

  async create(dto: CreateArtistDto) {
    const { data, error } = await this.supabase.client
      .from("artists")
      .insert({ ...dto, permission_status: "pending" })
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to create artist");
    return data;
  }

  async setPermission(id: string, permissionStatus: Exclude<ArtistPermissionStatus, "pending">) {
    const { data, error } = await this.supabase.client
      .from("artists")
      .update({ permission_status: permissionStatus })
      .eq("id", id)
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to update artist permission");
    return data;
  }

  async assertApproved(id: string) {
    const { data, error } = await this.supabase.client
      .from("artists")
      .select("id,permission_status")
      .eq("id", id)
      .single();

    if (error || !data) {
      throw new NotFoundException("Artist not found");
    }

    if (data.permission_status !== "approved") {
      throw new BadRequestException("Artist is not approved for publication");
    }
  }
}
