import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SupabaseService } from "../common/supabase.service";
import { MessagesModule } from "../messages/messages.module";
import { AiAgentsController } from "./ai-agents.controller";
import { AiAgentsService } from "./ai-agents.service";

@Module({
  imports: [MessagesModule],
  controllers: [AiAgentsController],
  providers: [AiAgentsService, ConfigService, SupabaseService]
})
export class AiAgentsModule {}
