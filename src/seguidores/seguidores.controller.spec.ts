import { Test, TestingModule } from '@nestjs/testing';
import { SeguidoresController } from './seguidores.controller';
import { SeguidoresService } from './seguidores.service';

describe('SeguidoresController', () => {
  let controller: SeguidoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguidoresController],
      providers: [SeguidoresService],
    }).compile();

    controller = module.get<SeguidoresController>(SeguidoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
