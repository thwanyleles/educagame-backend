import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesService } from './quizzes.service';
import { prismaMock } from '../../mocks/prisma.mock';
import { PrismaService } from '../../shared/prisma/prisma.service'; // Caminho do mock

describe('QuizzesService', () => {
  let service: QuizzesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createQuiz', () => {
    it('should create a new quiz', async () => {
      const createQuizData = {
        title: 'Quiz 1',
        description: 'Description of Quiz 1',
        turmaId: 1,
        categoria: 'Math',
      };

      prismaMock.quiz.create.mockResolvedValue(createQuizData);

      const result = await service.createQuiz(createQuizData);
      expect(result).toEqual(createQuizData);
      expect(prismaMock.quiz.create).toHaveBeenCalledWith({
        data: createQuizData,
      });
    });
  });

  describe('findQuizzesByTurma', () => {
    it('should return quizzes for a specific turma', async () => {
      const turmaId = 1;
      const quizzes = [
        { id: 1, title: 'Quiz 1', description: 'Description of Quiz 1' },
        { id: 2, title: 'Quiz 2', description: 'Description of Quiz 2' },
      ];

      prismaMock.quiz.findMany.mockResolvedValue(quizzes);

      const result = await service.findQuizzesByTurma(turmaId);
      expect(result).toEqual(quizzes);
      expect(prismaMock.quiz.findMany).toHaveBeenCalledWith({
        where: { turmaId },
        include: { perguntas: true },
      });
    });
  });

  describe('updateQuiz', () => {
    it('should update the quiz data', async () => {
      const updateData = { title: 'Updated Quiz' };
      const updatedQuiz = { id: 1, ...updateData };

      prismaMock.quiz.update.mockResolvedValue(updatedQuiz);

      const result = await service.updateQuiz(1, updateData);
      expect(result).toEqual(updatedQuiz);
      expect(prismaMock.quiz.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
    });
  });

  describe('deleteQuiz', () => {
    it('should delete the quiz', async () => {
      const quizId = 1;
      const deletedQuiz = { id: quizId, title: 'Quiz 1' };

      prismaMock.quiz.delete.mockResolvedValue(deletedQuiz);

      const result = await service.deleteQuiz(quizId);
      expect(result).toEqual(deletedQuiz);
      expect(prismaMock.quiz.delete).toHaveBeenCalledWith({
        where: { id: quizId },
      });
    });
  });
});
