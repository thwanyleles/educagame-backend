import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  async criarAtividade(@Body() data: CreateActivityDto) {
    return this.activitiesService.criarAtividade(data);
  }

  @Get('turma/:turmaId')
  async listarAtividadesTurma(@Param('turmaId') turmaId: number) {
    return this.activitiesService.listarAtividadesTurma(turmaId);
  }

  @Patch(':id')
  async editarAtividade(
    @Param('id') id: number,
    @Body() data: UpdateActivityDto,
  ) {
    return this.activitiesService.editarAtividade(id, data);
  }

  @Delete(':id')
  async excluirAtividade(@Param('id') id: number) {
    return this.activitiesService.excluirAtividade(id);
  }
}
