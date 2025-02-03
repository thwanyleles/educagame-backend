import { IsString, IsInt } from 'class-validator';

export class UpdateTurmaDto {
  @IsString()
  name?: string;

  @IsInt()
  professorId?: number;
}
