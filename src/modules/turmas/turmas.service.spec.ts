import { Test, TestingModule } from '@nestjs/testing';
import { TurmasService } from './turmas.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { createMockPrismaService } from '../../shared/prisma/prisma.service.mock';

describe('TurmasService', () => {
  let service: TurmasService;
  let prisma: ReturnType<typeof createMockPrismaService>;

  beforeEach(async () => {
    prisma = createMockPrismaService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [TurmasService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<TurmasService>(TurmasService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('createTurma', () => {
    it('deve criar uma nova turma', async () => {
      const createMock = {
        id: 1,
        name: 'Nova Turma',
        professorId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.turma.create.mockResolvedValueOnce(createMock);

      const result = await service.createTurma({
        name: 'Nova Turma',
        professorId: 10,
      });

      expect(result).toEqual(createMock);
      expect(prisma.turma.create).toHaveBeenCalledWith({
        data: { name: 'Nova Turma', professorId: 10 },
      });
    });
  });

  describe('findAllTurmas', () => {
    it('deve listar todas as turmas', async () => {
      const turmasMock = [
        {
          id: 1,
          name: 'Turma 1',
          professor: { id: 10, name: 'Professor 1' },
          alunos: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prisma.turma.findMany.mockResolvedValueOnce(turmasMock);

      const result = await service.findAllTurmas();

      expect(result).toEqual(turmasMock);
      expect(prisma.turma.findMany).toHaveBeenCalledWith({
        include: { professor: true, alunos: true },
      });
    });
  });

  describe('updateTurma', () => {
    it('deve atualizar uma turma existente', async () => {
      const updateMock = {
        id: 1,
        name: 'Turma Atualizada',
        professorId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.turma.findUnique.mockResolvedValueOnce(updateMock);
      prisma.turma.update.mockResolvedValueOnce(updateMock);

      const result = await service.updateTurma(1, { name: 'Turma Atualizada' });

      expect(result).toEqual(updateMock);
      expect(prisma.turma.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.turma.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'Turma Atualizada' },
      });
    });

    it('deve lançar um erro ao tentar atualizar uma turma inexistente', async () => {
      prisma.turma.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.updateTurma(999, { name: 'Turma Atualizada' }),
      ).rejects.toThrow(Error);
    });
  });

  describe('deleteTurma', () => {
    it('deve deletar uma turma existente', async () => {
      const deleteMock = {
        id: 1,
        name: 'Turma Deletada',
        professorId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.turma.findUnique.mockResolvedValueOnce(deleteMock);
      prisma.turma.delete.mockResolvedValueOnce(deleteMock);

      const result = await service.deleteTurma(1);

      expect(result).toEqual(deleteMock);
      expect(prisma.turma.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.turma.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve lançar NotFoundException ao tentar deletar uma turma inexistente', async () => {
      prisma.turma.findUnique.mockResolvedValueOnce(null);

      await expect(service.deleteTurma(999)).rejects.toThrow(NotFoundException);
    });
  });
});
