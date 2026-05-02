import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MessageTheme } from "../common/app.types";

const themes: MessageTheme[] = ["amor", "perdao", "fe", "compaixao", "esperanca", "reflexao"];

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  title_en?: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsOptional()
  @IsString()
  content_en?: string;

  @IsOptional()
  @IsString()
  bible_reference?: string;

  @IsIn(themes)
  theme!: MessageTheme;
}

export class ScheduleMessageDto {
  @IsDateString()
  publish_date!: string;
}
