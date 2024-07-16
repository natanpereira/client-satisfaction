import { PartialType } from '@nestjs/swagger';
import { CreateClientSatisfactionDto } from './create-client-satisfaction.dto';

export class UpdateClientSatisfactionDto extends PartialType(
  CreateClientSatisfactionDto,
) {}
