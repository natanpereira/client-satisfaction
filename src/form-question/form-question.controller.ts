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
import { CreateManyQuestions } from './dto/create-form-question.dto';
import { UpdateFormQuestionDto } from './dto/update-form-question.dto';
import { FormQuestionService } from './form-question.service';

@Controller('form-question')
@ApiTags('Form Question')
export class FormQuestionController {
  constructor(private readonly formQuestionService: FormQuestionService) {}

  @Post(':formId')
  async create(
    @Param('formId') formId: string,
    @Body() createFormQuestionDto: CreateManyQuestions,
  ) {
    return await this.formQuestionService.create(
      +formId,
      createFormQuestionDto,
    );
  }

  @Get()
  findAll() {
    return this.formQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formQuestionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormQuestionDto: UpdateFormQuestionDto,
  ) {
    this.formQuestionService.update(+id, updateFormQuestionDto);
    return { id, ...updateFormQuestionDto };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formQuestionService.remove(+id);
  }
}
