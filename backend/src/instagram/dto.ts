import { IsDateString, IsIn, IsOptional, IsString, IsUrl } from "class-validator";
import { InstagramPostType } from "../common/app.types";

export class PublishInstagramDto {
  @IsString()
  caption!: string;

  @IsUrl({ require_tld: false })
  media_url!: string;

  @IsOptional()
  @IsDateString()
  scheduled_at?: string;
}

export class CreateInstagramPostDto extends PublishInstagramDto {
  @IsIn(["image", "reel"])
  type!: InstagramPostType;
}
