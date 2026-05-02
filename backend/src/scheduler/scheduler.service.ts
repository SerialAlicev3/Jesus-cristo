import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InstagramService } from "../instagram/instagram.service";
import { MessagesService } from "../messages/messages.service";
import { ReelsService } from "../reels/reels.service";

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly messages: MessagesService,
    private readonly reels: ReelsService,
    private readonly instagram: InstagramService
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async publishScheduledContent() {
    const now = new Date();
    const messages = await this.messages.publishScheduled(now);
    const reels = await this.reels.publishDueReels(now);
    const instagramPosts = await this.instagram.publishDuePosts(now);

    if (messages.length || reels.length || instagramPosts.length) {
      this.logger.log(
        `Published scheduled content: messages=${messages.length}, reels=${reels.length}, instagram_posts=${instagramPosts.length}`
      );
    }
  }
}
