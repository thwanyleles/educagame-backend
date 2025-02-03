import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async criarAtividade(data: CreateActivityDto) {
    return this.prisma.activity.create({
      data,
    });
  }

  async listarAtividadesTurma(turmaId: number) {
    return this.prisma.activity.findMany({
      where: { turmaId },
    });
  }

  async editarAtividade(id: number, data: UpdateActivityDto) {
    return this.prisma.activity.update({
      where: { id },
      data,
    });
  }

  async excluirAtividade(id: number) {
    return this.prisma.activity.delete({
      where: { id },
    });
  }
}
