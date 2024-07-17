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
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [Form, FormQuestion, Answer],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
