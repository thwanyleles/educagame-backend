import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  link?: string;

  @IsInt()
  turmaId!: number;

  @IsInt()
  createdById!: number;
}
