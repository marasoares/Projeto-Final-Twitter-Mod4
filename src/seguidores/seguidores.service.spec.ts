import { Test, TestingModule } from '@nestjs/testing';
import { SeguidoresService } from './seguidores.service';

describe('SeguidoresService', () => {
  let service: SeguidoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguidoresService],
    }).compile();

    service = module.get<SeguidoresService>(SeguidoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
