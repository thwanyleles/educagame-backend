import { Test, TestingModule } from '@nestjs/testing';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { PermissionsService } from '../auth/permissions.service';

describe('TurmasController', () => {
  let controller: TurmasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurmasController],
      providers: [TurmasService, PrismaService, PermissionsService],
    }).compile();

    controller = module.get<TurmasController>(TurmasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
