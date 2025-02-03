import { Test, TestingModule } from '@nestjs/testing';
import { GamificationService } from './gamification.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { createMockPrismaService } from '../../mocks/prisma.mock';

describe('GamificationService', () => {
  let service: GamificationService;
  let prisma: ReturnType<typeof createMockPrismaService>;

  beforeEach(async () => {
    prisma = createMockPrismaService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamificationService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<GamificationService>(GamificationService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('adicionarPontos', () => {
    it('deve adicionar pontos a um aluno existente', async () => {
      const mockResultado = {
        id: 1,
        alunoId: 1,
        quizId: 1,
        pontuacao: 20,
        createdAt: new Date(),
        feedback: null,
      };

      prisma.resultado.upsert.mockResolvedValueOnce(mockResultado);

      const result = await service.adicionarPontos({
        alunoId: 1,
        quizId: 1,
        pontos: 10,
      });

      expect(prisma.resultado.upsert).toHaveBeenCalledWith({
        where: { alunoId_quizId: { alunoId: 1, quizId: 1 } },
        update: { pontuacao: { increment: 10 } },
        create: { alunoId: 1, quizId: 1, pontuacao: 10 },
      });
      expect(result).toEqual(mockResultado);
    });
  });

  describe('listarRanking', () => {
    it('deve retornar o ranking de uma turma', async () => {
      const mockRanking = [
        {
          id: 1,
          alunoId: 1,
          quizId: 1,
          pontuacao: 50,
          aluno: { id: 1, name: 'Aluno 1' },
        },
        {
          id: 2,
          alunoId: 2,
          quizId: 1,
          pontuacao: 30,
          aluno: { id: 2, name: 'Aluno 2' },
        },
      ];

      prisma.resultado.findMany.mockResolvedValueOnce(mockRanking);

      const result = await service.listarRanking(1);

      expect(prisma.resultado.findMany).toHaveBeenCalledWith({
        where: { quiz: { turmaId: 1 } },
        orderBy: { pontuacao: 'desc' },
        include: { aluno: true },
      });
      expect(result).toEqual(mockRanking);
    });

    it('deve retornar uma lista vazia se nenhum registro for encontrado', async () => {
      prisma.resultado.findMany.mockResolvedValueOnce([]);

      const result = await service.listarRanking(1);

      expect(prisma.resultado.findMany).toHaveBeenCalledWith({
        where: { quiz: { turmaId: 1 } },
        orderBy: { pontuacao: 'desc' },
        include: { aluno: true },
      });
      expect(result).toEqual([]);
    });
  });

  describe('listarBadges', () => {
    it('deve retornar todos os badges de um aluno', async () => {
      const mockBadges = [
        { id: 1, title: 'Primeiro Lugar', alunoId: 1, createdAt: new Date() },
        { id: 2, title: 'Participação', alunoId: 1, createdAt: new Date() },
      ];

      prisma.badge.findMany.mockResolvedValueOnce(mockBadges);

      const result = await service.listarBadges(1);

      expect(prisma.badge.findMany).toHaveBeenCalledWith({
        where: { alunoId: 1 },
      });
      expect(result).toEqual(mockBadges);
    });

    it('deve retornar uma lista vazia se o aluno não tiver badges', async () => {
      prisma.badge.findMany.mockResolvedValueOnce([]);

      const result = await service.listarBadges(1);

      expect(prisma.badge.findMany).toHaveBeenCalledWith({
        where: { alunoId: 1 },
      });
      expect(result).toEqual([]);
    });
  });

  describe('atribuirBadge', () => {
    it('deve atribuir um badge a um aluno', async () => {
      const mockBadge = {
        id: 1,
        title: 'Primeiro Lugar',
        description: 'Conquista por alcançar o primeiro lugar no ranking',
        alunoId: 1,
        createdAt: new Date(),
      };

      prisma.badge.create.mockResolvedValueOnce(mockBadge);

      const result = await service.atribuirBadge({
        alunoId: 1,
        title: 'Primeiro Lugar',
        description: 'Conquista por alcançar o primeiro lugar no ranking',
      });

      expect(prisma.badge.create).toHaveBeenCalledWith({
        data: {
          title: 'Primeiro Lugar',
          description: 'Conquista por alcançar o primeiro lugar no ranking',
          alunoId: 1,
        },
      });
      expect(result).toEqual(mockBadge);
    });
  });
});
