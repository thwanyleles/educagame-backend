import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesService } from './activities.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { mockPrismaService } from '../../mocks/prisma.mock';

describe('ActivitiesService', () => {
  let service: ActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('criarAtividade', () => {
    it('should create a new activity', async () => {
      const createData = {
        title: 'New Activity',
        description: 'Activity description',
        link: 'http://link.com',
        turmaId: 1,
        createdById: 2,
      };

      mockPrismaService.activity.create.mockResolvedValue(createData);

      const result = await service.criarAtividade(createData);
      expect(result).toEqual(createData);
      expect(mockPrismaService.activity.create).toHaveBeenCalledWith({
        data: createData,
      });
    });
  });

  describe('listarAtividadesTurma', () => {
    it('should return activities for a specific turma', async () => {
      const turmaId = 1;
      const activities = [
        { id: 1, title: 'Activity 1', turmaId },
        { id: 2, title: 'Activity 2', turmaId },
      ];

      mockPrismaService.activity.findMany.mockResolvedValue(activities);

      const result = await service.listarAtividadesTurma(turmaId);
      expect(result).toEqual(activities);
      expect(mockPrismaService.activity.findMany).toHaveBeenCalledWith({
        where: { turmaId },
      });
    });
  });

  describe('editarAtividade', () => {
    it('should update an existing activity', async () => {
      const id = 1;
      const updateData = {
        title: 'Updated Activity',
        description: 'Updated description',
        link: 'http://updated-link.com',
      };

      const updatedActivity = { ...updateData, id };

      mockPrismaService.activity.update.mockResolvedValue(updatedActivity);

      const result = await service.editarAtividade(id, updateData);
      expect(result).toEqual(updatedActivity);
      expect(mockPrismaService.activity.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
    });
  });

  describe('excluirAtividade', () => {
    it('should delete an existing activity', async () => {
      const id = 1;
      const deletedActivity = { id, title: 'Deleted Activity' };

      mockPrismaService.activity.delete.mockResolvedValue(deletedActivity);

      const result = await service.excluirAtividade(id);
      expect(result).toEqual(deletedActivity);
      expect(mockPrismaService.activity.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
