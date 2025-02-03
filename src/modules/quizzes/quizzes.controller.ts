import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.createQuiz(createQuizDto);
  }

  @Get('turma/:id')
  async findQuizzesByTurma(@Param('id') turmaId: number) {
    return this.quizzesService.findQuizzesByTurma(turmaId);
  }

  @Patch(':id')
  async updateQuiz(
    @Param('id') id: number,
    @Body()
    updateQuizDto: { title?: string; description?: string; categoria?: string },
  ) {
    return this.quizzesService.updateQuiz(id, updateQuizDto);
  }

  @Delete(':id')
  async deleteQuiz(@Param('id') id: number) {
    return this.quizzesService.deleteQuiz(id);
  }
}
