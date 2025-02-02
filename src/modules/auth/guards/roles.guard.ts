import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { RequestWithUser } from '../request-with-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<Role>('role', context.getHandler());
    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    console.log('Request recebido:', request.headers);
    console.log('Usuário no request:', request.user);

    const user = request.user;
    if (!user) {
      console.error('Usuário não encontrado no request');
      throw new ForbiddenException('Usuário não autenticado');
    }

    if (user.role !== requiredRole) {
      console.error(
        `Papel do usuário (${user.role}) não corresponde ao necessário (${requiredRole})`,
      );
      throw new ForbiddenException('Recurso proibido');
    }

    console.log('Acesso permitido para o usuário:', user);
    return true;
  }
}
