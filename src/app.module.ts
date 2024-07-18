import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AnswerModule } from './answer/answer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormQuestionModule } from './form-question/form-question.module';
import { FormModule } from './form/form.module';
import { ExportModule } from './export/export.module';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();
@Module({
  imports: [FormModule, FormQuestionModule, AnswerModule, ExportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
