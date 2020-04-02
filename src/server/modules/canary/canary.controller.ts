import { Controller, Get } from '@nestjs/common';

@Controller('canary')
export class CanaryController {
  @Get()
  getAll(): { message: true } {
    return {
      message: true,
    };
  }
}
