import { Test, TestingModule } from '@nestjs/testing';
import { GamificationController } from './gamification.controller';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { GamificationService } from './gamification.service';

describe('GamificationController', () => {
  let controller: GamificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamificationController],
      providers: [PrismaService, GamificationService],
    }).compile();

    controller = module.get<GamificationController>(GamificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
