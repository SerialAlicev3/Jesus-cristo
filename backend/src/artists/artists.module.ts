import { Module } from "@nestjs/common";
import { SupabaseService } from "../common/supabase.service";
import { ArtistsController } from "./artists.controller";
import { ArtistsService } from "./artists.service";

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, SupabaseService],
  exports: [ArtistsService]
})
export class ArtistsModule {}
