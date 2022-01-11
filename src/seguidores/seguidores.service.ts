import { Injectable } from '@nestjs/common';
import { CreateSeguidoresDto } from './dto/create-seguidores.dto';
import { UpdateSeguidoresDto } from './dto/update-seguidores.dto';
import { Seguidores } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class SeguidoresService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async createPrisma(createSeguidoresDto: CreateSeguidoresDto): Promise<Seguidores> {
    return await this.prisma.seguidores.create({
      data: { ...createSeguidoresDto },
    });
  }

  async findAllPrisma(): Promise<Seguidores[]> {
    return await this.prisma.seguidores.findMany();
  }

  async findOnePrisma(id: number): Promise<Seguidores> {
    return await this.prisma.seguidores.findUnique({ where: { id } });
  }

  async updatePrisma(
    id: number,
    updateSeguidoresDto: UpdateSeguidoresDto,
  ): Promise<Seguidores> {
    return await this.prisma.seguidores.update({
      data: { ...updateSeguidoresDto },
      where: { id },
    });
  }

  async removePrisma(id: number) {
    return await this.prisma.seguidores.delete({ where: { id } });
  }
}
  