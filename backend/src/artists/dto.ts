import { IsIn, IsOptional, IsString } from "class-validator";
import { ArtistPermissionStatus } from "../common/app.types";

export class CreateArtistDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  instagram_handle?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}

export class ApproveArtistDto {
  @IsIn(["approved", "rejected"])
  permission_status!: Exclude<ArtistPermissionStatus, "pending">;
}
