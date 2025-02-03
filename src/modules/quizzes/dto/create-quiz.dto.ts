import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  turmaId!: number;

  @IsString()
  categoria!: string;
}
