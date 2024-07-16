import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateClientSatisfactionDto } from './dto/create-client-satisfaction.dto';
import { UpdateClientSatisfactionDto } from './dto/update-client-satisfaction.dto';
import { ClientSatisfaction } from './entities/client-satisfaction.entity';

@Injectable()
export class ClientSatisfactionService {
  constructor(
    @Inject('CLIENT_SATISFACTION_REPOSITORY')
    protected clientSatisfactionRepository: Repository<ClientSatisfaction>,
  ) {}
  async create(createClientSatisfactionDto: CreateClientSatisfactionDto) {
    const newEntity = this.clientSatisfactionRepository.create(
      createClientSatisfactionDto,
    );

    const persistedEntity =
      await this.clientSatisfactionRepository.save(newEntity);

    return persistedEntity;
  }

  async findAll() {
    return await this.clientSatisfactionRepository.find();
  }

  async findOne(id: number) {
    return await this.clientSatisfactionRepository.findOneByOrFail({
      id,
    });
  }

  async update(
    id: number,
    updateClientSatisfactionDto: UpdateClientSatisfactionDto,
  ) {
    const entity = await this.clientSatisfactionRepository.findOneByOrFail({
      id,
    });

    await this.clientSatisfactionRepository.update(
      entity.id,
      updateClientSatisfactionDto,
    );

    return updateClientSatisfactionDto;
  }

  async remove(id: number) {
    await this.clientSatisfactionRepository.softDelete(id);

    return { success: true };
  }
}
