import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { AdicionarPontosDto } from './dto/adicionar-pontos.dto';
import { AtribuirBadgeDto } from './dto/atribuir-badge.dto';

@Injectable()
export class GamificationService {
  constructor(private readonly prisma: PrismaService) {}

  async adicionarPontos(adicionarPontosDto: AdicionarPontosDto) {
    const { alunoId, quizId, pontos } = adicionarPontosDto;
    return this.prisma.resultado.upsert({
      where: { alunoId_quizId: { alunoId, quizId } },
      update: { pontuacao: { increment: pontos } },
      create: { alunoId, quizId, pontuacao: pontos },
    });
  }

  async listarRanking(turmaId: number) {
    return this.prisma.resultado.findMany({
      where: { quiz: { turmaId } },
      orderBy: { pontuacao: 'desc' },
      include: { aluno: true },
    });
  }

  async listarBadges(alunoId: number) {
    return this.prisma.badge.findMany({
      where: { alunoId },
    });
  }

  async atribuirBadge(atribuirBadgeDto: AtribuirBadgeDto) {
    const { alunoId, title, description } = atribuirBadgeDto;
    return this.prisma.badge.create({
      data: {
        title,
        description,
        alunoId,
      },
    });
  }

  async obterResultadosAluno(alunoId: number, turmaId: number) {
    return this.prisma.resultado.findMany({
      where: {
        alunoId,
        quiz: { turmaId },
      },
      include: {
        quiz: true,
      },
    });
  }

  async obterRelatorioTurma(turmaId: number) {
    return this.prisma.resultado.findMany({
      where: {
        quiz: { turmaId },
      },
      include: {
        aluno: true,
        quiz: true,
      },
      orderBy: {
        pontuacao: 'desc',
      },
    });
  }

  async obterBadgesAluno(alunoId: number) {
    return this.prisma.badge.findMany({
      where: { alunoId },
    });
  }
}
