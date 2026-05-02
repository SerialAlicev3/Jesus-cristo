import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AiAgentsModule } from "./ai-agents/ai-agents.module";
import { ArtistsModule } from "./artists/artists.module";
import { AuthModule } from "./auth/auth.module";
import { SupabaseService } from "./common/supabase.service";
import { InstagramModule } from "./instagram/instagram.module";
import { MessagesModule } from "./messages/messages.module";
import { ReelsModule } from "./reels/reels.module";
import { SchedulerModule } from "./scheduler/scheduler.module";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    MessagesModule,
    ArtistsModule,
    ReelsModule,
    InstagramModule,
    AiAgentsModule,
    SchedulerModule
  ],
  controllers: [AppController],
  providers: [SupabaseService]
})
export class AppModule {}
