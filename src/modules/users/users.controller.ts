import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role as RoleDecorator } from '../auth/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('admin-only')
  @RoleDecorator(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  adminOnly() {
    return { message: 'Você é um administrador!' };
  }

  @Post('register-admin')
  async registerAdmin(
    @Body() createAdminDto: { email: string; password: string; name: string },
  ) {
    const adminExists = await this.usersService.adminExists();
    if (adminExists) {
      throw new BadRequestException(
        'O administrador já foi registrado no sistema',
      );
    }

    return this.usersService.createUser({
      ...createAdminDto,
      role: 'admin',
    });
  }
}
