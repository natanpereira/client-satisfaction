import { Test, TestingModule } from '@nestjs/testing';
import { ClientSatisfactionService } from './client-satisfaction.service';

describe('ClientSatisfactionService', () => {
  let service: ClientSatisfactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientSatisfactionService],
    }).compile();

    service = module.get<ClientSatisfactionService>(ClientSatisfactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
