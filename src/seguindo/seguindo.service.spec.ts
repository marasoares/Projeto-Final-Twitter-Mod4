import { Test, TestingModule } from '@nestjs/testing';
import { SeguindoService } from './seguindo.service';

describe('SeguindoService', () => {
  let service: SeguindoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguindoService],
    }).compile();

    service = module.get<SeguindoService>(SeguindoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
