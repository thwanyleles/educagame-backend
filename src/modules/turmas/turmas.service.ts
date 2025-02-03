import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class TurmasService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar uma nova turma
  async createTurma(data: { name: string; professorId: number }) {
    return this.prisma.turma.create({
      data: {
        name: data.name,
        professorId: data.professorId,
      },
    });
  }

  // Listar todas as turmas
  async findAllTurmas() {
    return this.prisma.turma.findMany({
      include: {
        professor: true,
        alunos: true,
      },
    });
  }

  // Atualizar informações de uma turma
  async updateTurma(id: number, data: { name?: string; professorId?: number }) {
    return this.prisma.turma.update({
      where: { id },
      data,
    });
  }

  // Excluir uma turma
  async deleteTurma(id: number) {
    return this.prisma.turma.delete({
      where: { id },
    });
  }

  // Listar turmas de um professor específico
  async findProfessorTurmas(professorId: number) {
    return this.prisma.turma.findMany({
      where: { professorId },
      include: { alunos: true },
    });
  }

  // Adicionar um aluno a uma turma
  async addAlunoToTurma(turmaId: number, alunoId: number) {
    return this.prisma.turma.update({
      where: { id: turmaId },
      data: {
        alunos: {
          connect: { id: alunoId },
        },
      },
    });
  }

  // Listar alunos de uma turma
  async findAlunosByTurma(turmaId: number) {
    return this.prisma.user.findMany({
      where: {
        turmaId, // Verifica se o aluno pertence à turma
        role: 'aluno', // Filtra apenas os usuários com o papel de aluno
      },
    });
  }
}
