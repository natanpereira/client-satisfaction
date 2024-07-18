import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FormQuestionController } from './form-question.controller';
import { FormQuestionService } from './form-question.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FormQuestionController],
  providers: [FormQuestionService],
})
export class FormQuestionModule {}
