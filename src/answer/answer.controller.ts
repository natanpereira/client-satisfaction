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
import { AnswerResponse } from '../common/interfaces/answer.interface';
import { AnswerService } from './answer.service';
import { CreateArrayAnswersDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answer')
@ApiTags('Answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post(':formId')
  @ApiParam({ name: 'formId', type: String })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateArrayAnswersDto })
  @ApiOperation({
    summary: 'Create an answers',
    description: 'Create an answer for a formQuestion',
    operationId: 'create',
  })
  async create(
    @Param('formId') formId: string,
    @Body() createAnswerDto: CreateArrayAnswersDto,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.answerService.create(+formId, createAnswerDto);

    return reply.status(HttpStatus.CREATED).send(result);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [AnswerResponse] })
  @ApiOperation({
    summary: 'Get all answers',
    description: 'Get all answers',
    operationId: 'findAll',
  })
  async findAll(@Res() reply: FastifyReply) {
    const result = await this.answerService.findAll();

    return reply.status(HttpStatus.OK).send(result);
  }

  @Get(':answerId')
  @ApiParam({ name: 'answerId', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: AnswerResponse })
  @ApiOperation({
    summary: 'Get an answer',
    description: 'Get an answer',
    operationId: 'findOne',
  })
  async findOne(
    @Param('answerId') answerId: string,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.answerService.findOne(answerId);

    return reply.status(HttpStatus.OK).send(result);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateAnswerDto })
  @ApiOperation({
    summary: 'Update an answer',
    description: 'Update an answer',
    operationId: 'update',
  })
  update(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @Res() reply: FastifyReply,
  ) {
    const result = this.answerService.update(+id, updateAnswerDto);

    return reply.status(HttpStatus.OK).send(result);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({
    summary: 'Delete an answer',
    description: 'Delete an answer',
    operationId: 'remove',
  })
  remove(@Param('id') id: string, @Res() reply: FastifyReply) {
    const result = this.answerService.remove(+id);

    return reply.status(HttpStatus.OK).send(result);
  }
}
