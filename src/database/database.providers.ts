import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { FormQuestion } from './entities/form-question.entity';
import { Form } from './entities/form.entity';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [Form, FormQuestion, Answer],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
