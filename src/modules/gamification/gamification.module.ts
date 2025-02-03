import { Module } from '@nestjs/common';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Module({
  controllers: [GamificationController],
  providers: [GamificationService, PrismaService],
})
export class GamificationModule {}
