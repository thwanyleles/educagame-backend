import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  UseGuards,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestWithUser } from '../auth/request-with-user.interface';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { Role as RoleDecorator } from '../auth/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register-admin')
  async registerAdmin(@Body() createAdminDto: CreateUserDto) {
    const adminExists = await this.usersService.adminExists();
    if (adminExists) {
      throw new BadRequestException(
        'O administrador já foi registrado no sistema.',
      );
    }

    return this.usersService.createUser({
      ...createAdminDto,
      role: Role.admin,
    });
  }

  @Get('admin-only')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RoleDecorator(Role.admin)
  adminOnly(@Request() req: RequestWithUser) {
    return {
      message: 'Bem-vindo, administrador!',
      user: req.user,
    };
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createUser(
    @Request() req: RequestWithUser,
    @Body() createUserDto: CreateUserDto,
  ) {
    const { role } = req.user;

    if (role !== Role.admin && role !== Role.professor) {
      throw new BadRequestException('Acesso negado. Permissão necessária.');
    }

    return this.usersService.createUser(
      createUserDto as {
        email: string;
        password: string;
        name: string;
        role: Role;
        turmaId?: number;
      },
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listAllUsers(@Request() req: RequestWithUser) {
    const { role } = req.user;

    if (role !== Role.admin && role !== Role.professor) {
      throw new BadRequestException('Acesso negado. Permissão necessária.');
    }

    return this.usersService.findAllUsers();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async editUser(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { role } = req.user;

    if (role !== Role.admin && role !== Role.professor) {
      throw new BadRequestException('Acesso negado. Permissão necessária.');
    }

    return this.usersService.updateUser(Number(id), updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Request() req: RequestWithUser, @Param('id') id: string) {
    const { role } = req.user;

    if (role !== Role.admin && role !== Role.professor) {
      throw new BadRequestException('Acesso negado. Permissão necessária.');
    }

    return this.usersService.deleteUser(Number(id));
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMyProfile(@Request() req: RequestWithUser) {
    const userId = req.user.id;
    return this.usersService.findUserById(userId);
  }

  @Post('create-aluno')
  @UseGuards(AuthGuard('jwt'))
  async createAluno(
    @Request() req: RequestWithUser,
    @Body() createAlunoDto: CreateAlunoDto,
  ) {
    const { role } = req.user;

    if (role !== Role.admin && role !== Role.professor) {
      throw new BadRequestException('Acesso negado. Permissão necessária.');
    }

    return this.usersService.createUser({
      ...createAlunoDto,
      role: Role.aluno,
    });
  }

  @Patch(':id/edit-aluno')
  @UseGuards(AuthGuard('jwt'))
  async editAluno(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateAlunoDto: UpdateUserDto,
  ) {
    const { role } = req.user;

    if (role !== Role.admin && role !== Role.professor) {
      throw new BadRequestException('Acesso negado. Permissão necessária.');
    }

    return this.usersService.updateUser(Number(id), updateAlunoDto);
  }

  @Delete(':id/delete-aluno')
  @UseGuards(AuthGuard('jwt'))
  async deleteAluno(@Request() req: RequestWithUser, @Param('id') id: string) {
    const { role } = req.user;

    if (role !== Role.admin && role !== Role.professor) {
      throw new BadRequestException('Acesso negado. Permissão necessária.');
    }

    return this.usersService.deleteUser(Number(id));
  }

  @Get('alunos')
  @UseGuards(AuthGuard('jwt'))
  async listAlunosByProfessor(@Request() req: RequestWithUser) {
    const { role, id: professorId } = req.user;

    if (role !== Role.professor) {
      throw new BadRequestException(
        'Acesso negado. Apenas professores podem listar alunos.',
      );
    }

    return this.usersService.findAlunosByProfessor(professorId);
  }
}
