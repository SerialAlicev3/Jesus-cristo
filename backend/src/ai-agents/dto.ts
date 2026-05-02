import { IsIn, IsOptional, IsString } from "class-validator";
import { MessageTheme } from "../common/app.types";

const themes: MessageTheme[] = ["amor", "perdao", "fe", "compaixao", "esperanca", "reflexao"];

export class GenerateMessageDto {
  @IsIn(themes)
  theme!: MessageTheme;

  @IsOptional()
  @IsString()
  bible_reference?: string;
}

export class GenerateReelScriptDto {
  @IsIn(themes)
  theme!: MessageTheme;

  @IsOptional()
  @IsString()
  duration?: string;
}

export class ReviewContentDto {
  @IsString()
  content!: string;
}

export class GenerateWeekPlanDto {
  @IsOptional()
  @IsString()
  starts_on?: string;
}
