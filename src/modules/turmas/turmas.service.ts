import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class TurmasService {
  constructor(private readonly prisma: PrismaService) {}

  async createTurma(data: { name: string; professorId: number }) {
    return this.prisma.turma.create({
      data: {
        name: data.name,
        professorId: data.professorId,
      },
    });
  }

  async findAllTurmas() {
    return this.prisma.turma.findMany({
      include: {
        professor: true,
        alunos: true,
      },
    });
  }

  async updateTurma(id: number, data: { name?: string; professorId?: number }) {
    const turma = await this.prisma.turma.findUnique({ where: { id } });
    if (!turma) {
      throw new Error('Turma não encontrada');
    }

    return this.prisma.turma.update({
      where: { id },
      data,
    });
  }

  async deleteTurma(id: number) {
    const turma = await this.prisma.turma.findUnique({ where: { id } });
    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    return this.prisma.turma.delete({
      where: { id },
    });
  }

  async findProfessorTurmas(professorId: number) {
    return this.prisma.turma.findMany({
      where: { professorId },
      include: { alunos: true },
    });
  }

  async addAlunoToTurma(turmaId: number, alunoId: number, professorId: number) {
    const turma = await this.prisma.turma.findUnique({
      where: { id: turmaId },
    });

    if (!turma || turma.professorId !== professorId) {
      throw new Error('Acesso negado ou turma não encontrada');
    }

    return this.prisma.turma.update({
      where: { id: turmaId },
      data: {
        alunos: {
          connect: { id: alunoId },
        },
      },
    });
  }

  async findAlunosByTurma(turmaId: number) {
    return this.prisma.user.findMany({
      where: {
        turmaId,
        role: 'aluno',
      },
    });
  }

  async findTurmaById(turmaId: number) {
    return this.prisma.turma.findUnique({
      where: { id: turmaId },
    });
  }
}
