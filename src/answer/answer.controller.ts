import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { CreateArrayAnswersDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answer')
@ApiTags('Answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post(':formId')
  create(
    @Param('formId') formId: string,
    @Body() createAnswerDto: CreateArrayAnswersDto,
  ) {
    return this.answerService.create(+formId, createAnswerDto);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':answerId')
  findOne(@Param('answerId') answerId: string) {
    return this.answerService.findOne(answerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
