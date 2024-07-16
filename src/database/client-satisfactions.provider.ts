import { DataSource } from 'typeorm';
import { ClientSatisfaction } from '../client-satisfaction/entities/client-satisfaction.entity';

export const clientSatisfactionProviders = [
  {
    provide: 'CLIENT_SATISFACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ClientSatisfaction),
    inject: ['DATA_SOURCE'],
  },
];
