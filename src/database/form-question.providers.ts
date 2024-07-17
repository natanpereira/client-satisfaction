import { DataSource } from 'typeorm';
import { FormQuestion } from './entities/form-question.entity';

export const formQuestionProviders = [
  {
    provide: 'FORM_QUESTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FormQuestion),
    inject: ['DATA_SOURCE'],
  },
];
