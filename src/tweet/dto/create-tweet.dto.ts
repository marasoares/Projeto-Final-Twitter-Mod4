/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  texto: string;

  @IsNotEmpty()
  @IsString()
  emoji: string;

  @IsNotEmpty()
  @IsString()
  data_postagem: string;

  @IsNotEmpty()
  @IsInt()
  curtidas: number;

  @IsNotEmpty()
  @IsInt()
  usuarioid: number;
}
