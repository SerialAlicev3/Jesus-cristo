import { IsDateString, IsIn, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import { ReelSourceType } from "../common/app.types";

export class CreateReelDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  title_en?: string;

  @IsString()
  caption!: string;

  @IsOptional()
  @IsString()
  caption_en?: string;

  @IsUrl({ require_tld: false })
  video_url!: string;

  @IsOptional()
  @IsUUID()
  artist_id?: string;

  @IsIn(["original", "authorized", "embed"])
  source_type!: ReelSourceType;
}

export class ScheduleReelDto {
  @IsDateString()
  scheduled_at!: string;
}
