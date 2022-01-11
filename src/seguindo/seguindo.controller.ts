import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SeguindoService } from './seguindo.service';
import { CreateSeguindoDto } from './dto/create-seguindo.dto';
import { UpdateSeguindoDto } from './dto/update-seguindo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('seguindo')
export class SeguindoController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly seguindoService: SeguindoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createSeguindoDto: CreateSeguindoDto) {
    return this.seguindoService.createPrisma(createSeguindoDto);
  }

  @Get()
  findAll() {
    return this.seguindoService.findAllPrisma();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguindoService.findOnePrisma(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateSeguindoDto: UpdateSeguindoDto) {
    return this.seguindoService.updatePrisma(+id, updateSeguindoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.seguindoService.removePrisma(+id);
  }
}
