import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { AdicionarPontosDto } from './dto/adicionar-pontos.dto';
import { AtribuirBadgeDto } from './dto/atribuir-badge.dto';

@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Post('adicionar-pontos')
  async adicionarPontos(@Body() adicionarPontosDto: AdicionarPontosDto) {
    return this.gamificationService.adicionarPontos(adicionarPontosDto);
  }

  @Get('ranking/:turmaId')
  async listarRanking(@Param('turmaId', ParseIntPipe) turmaId: number) {
    return this.gamificationService.listarRanking(turmaId);
  }

  @Get('badges/:alunoId')
  async listarBadges(@Param('alunoId', ParseIntPipe) alunoId: number) {
    return this.gamificationService.listarBadges(alunoId);
  }

  @Post('atribuir-badge')
  async atribuirBadge(@Body() atribuirBadgeDto: AtribuirBadgeDto) {
    return this.gamificationService.atribuirBadge(atribuirBadgeDto);
  }

  @Get('resultados/:alunoId/:turmaId')
  async obterResultadosAluno(
    @Param('alunoId', ParseIntPipe) alunoId: number,
    @Param('turmaId', ParseIntPipe) turmaId: number,
  ) {
    return this.gamificationService.obterResultadosAluno(alunoId, turmaId);
  }

  @Get('relatorio/:turmaId')
  async obterRelatorioTurma(@Param('turmaId', ParseIntPipe) turmaId: number) {
    return this.gamificationService.obterRelatorioTurma(turmaId);
  }
}
