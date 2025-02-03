import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: {
    email: string;
    password: string;
    name: string;
    role: Role;
    turmaId?: number;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async adminExists(): Promise<boolean> {
    const admin = await this.prisma.user.findFirst({
      where: { role: Role.admin },
    });
    return !!admin;
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async updateUser(
    id: number,
    data: { name?: string; email?: string },
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ForbiddenException('Usuário não encontrado');
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ForbiddenException('Usuário não encontrado');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAlunosByProfessor(professorId: number): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        role: Role.aluno,
        turma: {
          professorId: professorId,
        },
      },
      include: {
        turma: true,
      },
    });
  }
}
