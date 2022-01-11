/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSeguidoresDto {
    @IsNotEmpty()
    @IsString()
    seguidor: string;

    @IsNotEmpty()
    @IsInt()
    usuarioid: number;
}
