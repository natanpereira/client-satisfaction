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
import { Form } from '../database/entities/form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormService } from './form.service';

@Controller('form')
@ApiTags('Form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateFormDto })
  @ApiOperation({
    summary: 'Create new form',
    description: 'Create new form',
    operationId: 'create',
  })
  async create(
    @Body() createFormDto: CreateFormDto,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.formService.create(createFormDto);

    return reply.status(HttpStatus.CREATED).send(result);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Form] })
  @ApiOperation({
    summary: 'Get all forms',
    description: 'Get all forms',
    operationId: 'findAll',
  })
  async findAll(@Res() reply: FastifyReply) {
    const result = await this.formService.findAll();

    return reply.status(HttpStatus.OK).send(result);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: Form })
  @ApiOperation({
    summary: 'Get one form',
    description: 'Get one form',
    operationId: 'findOne',
  })
  async findOne(@Param('id') id: string, @Res() reply: FastifyReply) {
    const result = await this.formService.findOne(+id);

    return reply.status(HttpStatus.OK).send(result);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: Form })
  @ApiOperation({
    summary: 'Update one form',
    description: 'Update one form',
    operationId: 'update',
  })
  async update(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.formService.update(+id, updateFormDto);

    return reply.status(HttpStatus.OK).send(result);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: Form })
  @ApiOperation({
    summary: 'Delete one form',
    description: 'Delete one form',
    operationId: 'remove',
  })
  async remove(@Param('id') id: string, @Res() reply: FastifyReply) {
    const result = this.formService.remove(+id);

    return reply.status(HttpStatus.OK).send(result);
  }
}
