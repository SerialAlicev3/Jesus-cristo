import { Module } from "@nestjs/common";
import { SupabaseService } from "../common/supabase.service";
import { AuthGuard } from "./auth.guard";
import { RolesGuard } from "./roles.guard";

@Module({
  providers: [AuthGuard, RolesGuard, SupabaseService],
  exports: [AuthGuard, RolesGuard]
})
export class AuthModule {}
