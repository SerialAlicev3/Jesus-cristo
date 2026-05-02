import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateMessageDto, ScheduleMessageDto } from "./dto";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  @Get("today")
  today() {
    return this.messages.today();
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "editor")
  list() {
    return this.messages.list();
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "editor")
  create(@Body() body: CreateMessageDto) {
    return this.messages.create(body);
  }

  @Patch(":id/approve")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "editor")
  approve(@Param("id") id: string) {
    return this.messages.approve(id);
  }

  @Patch(":id/schedule")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "editor")
  schedule(@Param("id") id: string, @Body() body: ScheduleMessageDto) {
    return this.messages.schedule(id, body.publish_date);
  }
}
