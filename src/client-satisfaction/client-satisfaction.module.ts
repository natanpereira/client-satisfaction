import { Module } from '@nestjs/common';
import { clientSatisfactionProviders } from '../database/client-satisfactions.provider';
import { DatabaseModule } from '../database/database.module';
import { ClientSatisfactionController } from './client-satisfaction.controller';
import { ClientSatisfactionService } from './client-satisfaction.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientSatisfactionController],
  providers: [ClientSatisfactionService, ...clientSatisfactionProviders],
})
export class ClientSatisfactionModule {}
