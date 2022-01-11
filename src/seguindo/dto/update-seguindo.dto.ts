import { PartialType } from '@nestjs/mapped-types';
import { CreateSeguindoDto } from './create-seguindo.dto';

export class UpdateSeguindoDto extends PartialType(CreateSeguindoDto) {}
