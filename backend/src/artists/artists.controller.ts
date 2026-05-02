import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { ArtistsService } from "./artists.service";
import { ApproveArtistDto, CreateArtistDto } from "./dto";

@Controller("artists")
@UseGuards(AuthGuard, RolesGuard)
export class ArtistsController {
  constructor(private readonly artists: ArtistsService) {}

  @Get()
  list() {
    return this.artists.list();
  }

  @Post()
  @Roles("admin", "editor")
  create(@Body() body: CreateArtistDto) {
    return this.artists.create(body);
  }

  @Patch(":id/approve")
  @Roles("admin")
  approve(@Param("id") id: string, @Body() body: ApproveArtistDto) {
    return this.artists.setPermission(id, body.permission_status);
  }
}
