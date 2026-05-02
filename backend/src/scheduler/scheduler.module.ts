import { Module } from "@nestjs/common";
import { InstagramModule } from "../instagram/instagram.module";
import { MessagesModule } from "../messages/messages.module";
import { ReelsModule } from "../reels/reels.module";
import { SchedulerService } from "./scheduler.service";

@Module({
  imports: [MessagesModule, ReelsModule, InstagramModule],
  providers: [SchedulerService]
})
export class SchedulerModule {}
