import { Injectable } from "@nestjs/common";
import { throwIfSupabaseError } from "../common/database-error";
import { SupabaseService } from "../common/supabase.service";

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async list() {
    const { data, error } = await this.supabase.client
      .from("users")
      .select("id,name,email,role,created_at")
      .order("created_at", { ascending: false });

    throwIfSupabaseError(error, "Unable to list users");
    return data;
  }
}
