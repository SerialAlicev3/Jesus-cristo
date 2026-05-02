import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  health() {
    return {
      name: "Jesus Cristo API",
      status: "online"
    };
  }
}
