import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Role as RoleDecorator } from '../auth/role.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { RequestWithUser } from '../auth/request-with-user.interface';
import { PermissionsService } from '../auth/permissions.service';

@Controller('turmas')
export class TurmasController {
  constructor(
    private readonly turmasService: TurmasService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Post('create')
  @RoleDecorator(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createTurma(@Body() createTurmaDto: CreateTurmaDto) {
    return this.turmasService.createTurma(createTurmaDto);
  }

  @Get()
  @RoleDecorator(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async listAllTurmas() {
    return this.turmasService.findAllTurmas();
  }

  @Patch(':id')
  @RoleDecorator(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async editTurma(
    @Param('id') id: number,
    @Body() updateTurmaDto: UpdateTurmaDto,
  ) {
    return this.turmasService.updateTurma(id, updateTurmaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteTurma(@Request() req: RequestWithUser, @Param('id') id: number) {
    const { role } = req.user;

    this.permissionsService.canDeleteTurma(role);

    return this.turmasService.deleteTurma(id);
  }

  @Get('me')
  @RoleDecorator(Role.professor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async listProfessorTurmas(@Request() req: RequestWithUser) {
    const professorId = req.user.id;
    return this.turmasService.findProfessorTurmas(professorId);
  }

  @Post(':id/add-aluno')
  @RoleDecorator(Role.professor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async addAlunoToTurma(
    @Param('id') turmaId: number,
    @Body() alunoDto: { alunoId: number },
    @Request() req: RequestWithUser,
  ) {
    const professorId = req.user.id;

    const turma = await this.turmasService.findTurmaById(turmaId);

    if (!turma) {
      throw new NotFoundException('Turma não encontrada.');
    }

    this.permissionsService.canManageOwnTurma(
      req.user.role,
      turma.professorId,
      professorId,
    );

    return this.turmasService.addAlunoToTurma(
      turmaId,
      alunoDto.alunoId,
      professorId,
    );
  }

  @Get(':id/alunos')
  @RoleDecorator(Role.professor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async listAlunosByTurma(@Param('id') turmaId: number) {
    return this.turmasService.findAlunosByTurma(turmaId);
  }
}
