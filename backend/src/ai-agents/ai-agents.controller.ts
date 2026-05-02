import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AiAgentsService } from "./ai-agents.service";
import { GenerateMessageDto, GenerateReelScriptDto, GenerateWeekPlanDto, ReviewContentDto } from "./dto";

@Controller("ai")
@UseGuards(AuthGuard, RolesGuard)
@Roles("admin", "editor")
export class AiAgentsController {
  constructor(private readonly ai: AiAgentsService) {}

  @Get("agents")
  agents() {
    return this.ai.listAgents();
  }

  @Post("generate-message")
  generateMessage(@Body() body: GenerateMessageDto) {
    return this.ai.generateMessage(body);
  }

  @Post("generate-reel-script")
  generateReelScript(@Body() body: GenerateReelScriptDto) {
    return this.ai.generateReelScript(body);
  }

  @Post("review-content")
  reviewContent(@Body() body: ReviewContentDto) {
    return this.ai.reviewContent(body.content);
  }

  @Post("generate-week-plan")
  generateWeekPlan(@Body() body: GenerateWeekPlanDto) {
    return this.ai.generateWeekPlan(body);
  }
}
