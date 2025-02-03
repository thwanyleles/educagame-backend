import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuiz(data: {
    title: string;
    description?: string;
    turmaId: number;
    categoria: string;
  }) {
    return this.prisma.quiz.create({
      data,
    });
  }

  async findQuizzesByTurma(turmaId: number) {
    return this.prisma.quiz.findMany({
      where: { turmaId },
      include: { perguntas: true },
    });
  }

  async updateQuiz(
    id: number,
    data: { title?: string; description?: string; categoria?: string },
  ) {
    return this.prisma.quiz.update({
      where: { id },
      data,
    });
  }

  async deleteQuiz(id: number) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
