import { SetMetadata } from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';

/**
 * Adiciona a metadata 'role' ao handler da rota.
 * Exemplo de uso:
 * @Role(RoleEnum.admin)
 */
export const Role = (role: RoleEnum) => SetMetadata('role', role);
