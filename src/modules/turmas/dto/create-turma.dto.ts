import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateTurmaDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  professorId!: number;
}