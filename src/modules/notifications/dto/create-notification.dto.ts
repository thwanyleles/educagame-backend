import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  message!: string;

  @IsNotEmpty()
  @IsString()
  destinatarioTipo!: string;

  @IsNotEmpty()
  @IsInt()
  destinatarioId!: number;
}