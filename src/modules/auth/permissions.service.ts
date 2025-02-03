import { Injectable, ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class PermissionsService {
  canManageUsers(userRole: Role) {
    if (userRole !== Role.admin && userRole !== Role.professor) {
      throw new ForbiddenException('Acesso negado. Permissão necessária.');
    }
  }

  canDeleteTurma(userRole: Role) {
    if (userRole !== Role.admin) {
      throw new ForbiddenException(
        'Apenas administradores podem excluir turmas.',
      );
    }
  }

  canManageOwnTurma(userRole: Role, turmaProfessorId: number, userId: number) {
    if (userRole !== Role.professor || turmaProfessorId !== userId) {
      throw new ForbiddenException(
        'Acesso negado. Você não é o responsável pela turma.',
      );
    }
  }
}
