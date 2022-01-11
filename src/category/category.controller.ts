import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createPrisma(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAllPrisma();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOnePrisma(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updatePrisma(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.categoryService.removePrisma(+id);
  }
}
