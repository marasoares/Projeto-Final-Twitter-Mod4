/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSeguindoDto {
  @IsNotEmpty()
  @IsInt()
  seguindo: number;

  @IsNotEmpty()
  @IsInt()
  usuarioid: number;
}
