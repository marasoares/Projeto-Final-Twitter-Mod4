import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  category: any;
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async createPrisma(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({
      data: { ...createCategoryDto },
    });
  }

  async findAllPrisma(): Promise<Category[]> {
    return await this.category.findMany();
  }

  async findOnePrisma(id: number): Promise<Category> {
    return await this.category.findUnique({ where: { id } });
  }

  async updatePrisma(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.prisma.category.update({
      data: { ...updateCategoryDto },
      where: { id },
    });
  }

  async removePrisma(id: number) {
    return await this.prisma.category.delete({ where: { id } });
  }
}