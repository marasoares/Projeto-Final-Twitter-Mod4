import { PartialType } from '@nestjs/mapped-types';
import { CreateSeguidoresDto } from './create-seguidores.dto';

export class UpdateSeguidoresDto extends PartialType(CreateSeguidoresDto) {}
