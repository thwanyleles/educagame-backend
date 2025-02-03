import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Role as RoleDecorator } from '../auth/role.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  // Administrador cria uma turma
  @Post('create')
  @RoleDecorator(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createTurma(
    @Body() createTurmaDto: { name: string; professorId: number },
  ) {
    return this.turmasService.createTurma(createTurmaDto);
  }

  // Administrador lista todas as turmas
  @Get()
  @RoleDecorator(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async listAllTurmas() {
    return this.turmasService.findAllTurmas();
  }

  // Administrador edita uma turma
  @Patch(':id')
  @RoleDecorator(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async editTurma(
    @Param('id') id: number,
    @Body() updateTurmaDto: { name?: string; professorId?: number },
  ) {
    return this.turmasService.updateTurma(id, updateTurmaDto);
  }

  // Administrador exclui uma turma
  @Delete(':id')
  @RoleDecorator(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteTurma(@Param('id') id: number) {
    return this.turmasService.deleteTurma(id);
  }

  // Professor lista suas turmas
  @Get('me')
  @RoleDecorator(Role.professor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async listProfessorTurmas(@Param('id') professorId: number) {
    return this.turmasService.findProfessorTurmas(professorId);
  }

  // Professor adiciona alunos a uma turma
  @Post(':id/add-aluno')
  @RoleDecorator(Role.professor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async addAlunoToTurma(
    @Param('id') turmaId: number,
    @Body() alunoDto: { alunoId: number },
  ) {
    return this.turmasService.addAlunoToTurma(turmaId, alunoDto.alunoId);
  }

  // Professor lista alunos de uma turma
  @Get(':id/alunos')
  @RoleDecorator(Role.professor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async listAlunosByTurma(@Param('id') turmaId: number) {
    return this.turmasService.findAlunosByTurma(turmaId);
  }
}
