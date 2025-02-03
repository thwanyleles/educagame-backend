import { IsString, IsOptional, IsInt } from 'class-validator';

export class AtribuirBadgeDto {
  @IsInt()
  alunoId!: number;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
