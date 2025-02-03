import { IsInt, IsPositive } from 'class-validator';

export class AdicionarPontosDto {
  @IsInt()
  alunoId!: number;

  @IsInt()
  quizId!: number;

  @IsInt()
  @IsPositive()
  pontos!: number;
}
