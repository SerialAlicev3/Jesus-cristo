import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { PublishInstagramDto } from "./dto";
import { InstagramService } from "./instagram.service";

@Controller("instagram")
@UseGuards(AuthGuard, RolesGuard)
export class InstagramController {
  constructor(private readonly instagram: InstagramService) {}

  @Get()
  @Roles("admin", "editor")
  list() {
    return this.instagram.list();
  }

  @Post("publish-image")
  @Roles("admin", "editor")
  publishImage(@Body() body: PublishInstagramDto) {
    return this.instagram.createOrPublish({ ...body, type: "image" });
  }

  @Post("publish-reel")
  @Roles("admin", "editor")
  publishReel(@Body() body: PublishInstagramDto) {
    return this.instagram.createOrPublish({ ...body, type: "reel" });
  }

  @Get("status/:id")
  status(@Param("id") id: string) {
    return this.instagram.status(id);
  }
}
