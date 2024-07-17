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
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormService } from './form.service';

@Controller('form')
@ApiTags('Form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Get()
  async findAll() {
    return await this.formService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.formService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(+id, updateFormDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.formService.remove(+id);
  }
}
