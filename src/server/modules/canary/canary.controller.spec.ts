import { Test, TestingModule } from '@nestjs/testing';
import { CanaryController } from './canary.controller';

describe('Canary Controller', () => {
  let controller: CanaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanaryController],
    }).compile();

    controller = module.get<CanaryController>(CanaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
