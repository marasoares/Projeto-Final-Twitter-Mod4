import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SeguidoresService } from './seguidores.service';
import { CreateSeguidoresDto } from './dto/create-seguidores.dto';
import { UpdateSeguidoresDto } from './dto/update-seguidores.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags( 'seguidores' )
@Controller('seguidores')
export class SeguidoresController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly seguidoresService: SeguidoresService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createSeguidoresDto: CreateSeguidoresDto) {
    return this.seguidoresService.createPrisma(createSeguidoresDto);
  }

  @Get()
  findAll() {
    return this.seguidoresService.findAllPrisma();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguidoresService.findOnePrisma(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateSeguidoresDto: UpdateSeguidoresDto) {
    return this.seguidoresService.updatePrisma(+id, updateSeguidoresDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.seguidoresService.removePrisma(+id);
  }
}
