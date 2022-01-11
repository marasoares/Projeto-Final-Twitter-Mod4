import { Module } from '@nestjs/common';
import { SeguidoresService } from './seguidores.service';
import { SeguidoresController } from './seguidores.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SeguidoresController],
  providers: [SeguidoresService],
})
export class SeguidoresModule {}
