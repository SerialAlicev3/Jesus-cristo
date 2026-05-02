import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateReelDto, ScheduleReelDto } from "./dto";
import { ReelsService } from "./reels.service";

@Controller("reels")
@UseGuards(AuthGuard, RolesGuard)
export class ReelsController {
  constructor(private readonly reels: ReelsService) {}

  @Get()
  list() {
    return this.reels.list();
  }

  @Post()
  @Roles("admin", "editor")
  create(@Body() body: CreateReelDto) {
    return this.reels.create(body);
  }

  @Patch(":id/approve")
  @Roles("admin", "editor")
  approve(@Param("id") id: string) {
    return this.reels.approve(id);
  }

  @Patch(":id/schedule")
  @Roles("admin", "editor")
  schedule(@Param("id") id: string, @Body() body: ScheduleReelDto) {
    return this.reels.schedule(id, body.scheduled_at);
  }

  @Post(":id/publish")
  @Roles("admin", "editor")
  publish(@Param("id") id: string) {
    return this.reels.publish(id);
  }
}
