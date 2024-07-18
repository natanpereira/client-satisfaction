import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { FormQuestion } from '../database/entities/form-question.entity';
import { CreateManyQuestions } from './dto/create-form-question.dto';
import { UpdateFormQuestionDto } from './dto/update-form-question.dto';
import { FormQuestionService } from './form-question.service';

@Controller('form-question')
@ApiTags('Form Question')
export class FormQuestionController {
  constructor(private readonly formQuestionService: FormQuestionService) {}

  @Post(':formId')
  @ApiParam({ name: 'formId', type: String })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateManyQuestions })
  @ApiOperation({
    summary: 'Create many questions',
    description: 'Create many questions in a form',
    operationId: 'create',
  })
  async create(
    @Param('formId') formId: string,
    @Body() createFormQuestionDto: CreateManyQuestions,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.formQuestionService.create(
      +formId,
      createFormQuestionDto,
    );

    return reply.status(HttpStatus.CREATED).send(result);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [FormQuestion] })
  @ApiOperation({
    summary: 'Get all questions',
    description: 'Get all questions',
    operationId: 'findAll',
  })
  async findAll(@Res() reply: FastifyReply) {
    const result = await this.formQuestionService.findAll();

    return reply.status(HttpStatus.OK).send(result);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: FormQuestion })
  @ApiOperation({
    summary: 'Get one question',
    description: 'Get one question',
    operationId: 'findOne',
  })
  findOne(@Param('id') id: string, @Res() reply: FastifyReply) {
    const result = this.formQuestionService.findOne(+id);

    return reply.status(HttpStatus.OK).send(result);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateFormQuestionDto })
  @ApiOperation({
    summary: 'Update one question',
    description: 'Update one question',
    operationId: 'update',
  })
  async update(
    @Param('id') id: string,
    @Body() updateFormQuestionDto: UpdateFormQuestionDto,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.formQuestionService.update(
      +id,
      updateFormQuestionDto,
    );

    return reply.status(HttpStatus.OK).send(result);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({
    summary: 'Delete one question',
    description: 'Delete one question',
    operationId: 'remove',
  })
  remove(@Param('id') id: string, @Res() reply: FastifyReply) {
    const result = this.formQuestionService.remove(+id);

    return reply.status(HttpStatus.OK).send(result);
  }
}
