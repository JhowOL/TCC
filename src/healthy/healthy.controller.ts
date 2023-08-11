import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  healthy(): string {
    return "Healthy";
  }
}
