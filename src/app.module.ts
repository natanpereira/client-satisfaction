import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientSatisfactionModule } from './client-satisfaction/client-satisfaction.module';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();
@Module({
  imports: [ClientSatisfactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
