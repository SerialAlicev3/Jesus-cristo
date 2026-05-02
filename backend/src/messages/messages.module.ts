import { Module } from "@nestjs/common";
import { SupabaseService } from "../common/supabase.service";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, SupabaseService],
  exports: [MessagesService]
})
export class MessagesModule {}
