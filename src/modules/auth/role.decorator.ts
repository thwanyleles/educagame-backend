import { SetMetadata } from '@nestjs/common';

/**
 * Adiciona a metadata 'role' ao handler da rota.
 * Exemplo de uso:
 * @Role(Role.admin)
 */
export const Role = (role: string) => SetMetadata('role', role);
