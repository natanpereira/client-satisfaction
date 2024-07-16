import { Test, TestingModule } from '@nestjs/testing';
import { ClientSatisfactionController } from './client-satisfaction.controller';
import { ClientSatisfactionService } from './client-satisfaction.service';

describe('ClientSatisfactionController', () => {
  let controller: ClientSatisfactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientSatisfactionController],
      providers: [ClientSatisfactionService],
    }).compile();

    controller = module.get<ClientSatisfactionController>(
      ClientSatisfactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
