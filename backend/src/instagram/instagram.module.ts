import { Module } from "@nestjs/common";
import { SupabaseService } from "../common/supabase.service";
import { InstagramController } from "./instagram.controller";
import { InstagramService } from "./instagram.service";

@Module({
  controllers: [InstagramController],
  providers: [InstagramService, SupabaseService],
  exports: [InstagramService]
})
export class InstagramModule {}
