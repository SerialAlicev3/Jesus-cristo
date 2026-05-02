import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  readonly client: SupabaseClient;

  constructor(config: ConfigService) {
    const supabaseUrl = config.get<string>("SUPABASE_URL");
    const serviceRoleKey = config.get<string>("SUPABASE_SERVICE_ROLE_KEY");

    this.client = createClient(
      supabaseUrl || "http://127.0.0.1:54321",
      serviceRoleKey || "development-placeholder-key",
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    );
  }
}
