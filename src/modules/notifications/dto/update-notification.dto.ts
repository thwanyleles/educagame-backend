import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  destinatarioTipo?: string;

  @IsOptional()
  @IsInt()
  destinatarioId?: number;
}