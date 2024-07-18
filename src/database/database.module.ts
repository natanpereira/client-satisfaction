import { Module } from '@nestjs/common';
import { answerProviders } from './answer.providers';
import { databaseProviders } from './database.providers';
import { formQuestionProviders } from './form-question.providers';
import { formProviders } from './form.provider';

@Module({
  providers: [
    ...databaseProviders,
    ...answerProviders,
    ...formQuestionProviders,
    ...formProviders,
  ],
  exports: [
    ...databaseProviders,
    ...answerProviders,
    ...formQuestionProviders,
    ...formProviders,
  ],
})
export class DatabaseModule {}
