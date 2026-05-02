import { Module } from "@nestjs/common";
import { ArtistsModule } from "../artists/artists.module";
import { SupabaseService } from "../common/supabase.service";
import { InstagramModule } from "../instagram/instagram.module";
import { ReelsController } from "./reels.controller";
import { ReelsService } from "./reels.service";

@Module({
  imports: [ArtistsModule, InstagramModule],
  controllers: [ReelsController],
  providers: [ReelsService, SupabaseService],
  exports: [ReelsService]
})
export class ReelsModule {}
