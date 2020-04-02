import { Module } from '@nestjs/common';
import { CanaryController } from './modules/canary/canary.controller';
@Module({
  imports: [],
  controllers: [CanaryController],
  providers: [],
})
export class AppModule {}
