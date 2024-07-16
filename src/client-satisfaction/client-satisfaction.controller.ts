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
import { ClientSatisfactionService } from './client-satisfaction.service';
import { CreateClientSatisfactionDto } from './dto/create-client-satisfaction.dto';
import { UpdateClientSatisfactionDto } from './dto/update-client-satisfaction.dto';

@Controller('client-satisfaction')
@ApiTags('Client Satisfaction')
export class ClientSatisfactionController {
  constructor(
    private readonly clientSatisfactionService: ClientSatisfactionService,
  ) {}

  @Post()
  create(@Body() createClientSatisfactionDto: CreateClientSatisfactionDto) {
    return this.clientSatisfactionService.create(createClientSatisfactionDto);
  }

  @Get()
  async findAll() {
    return await this.clientSatisfactionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientSatisfactionService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientSatisfactionDto: UpdateClientSatisfactionDto,
  ) {
    return this.clientSatisfactionService.update(
      +id,
      updateClientSatisfactionDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientSatisfactionService.remove(+id);
  }
}
