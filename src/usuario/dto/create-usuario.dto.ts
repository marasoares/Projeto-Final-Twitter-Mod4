/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    senha: string;

    @IsNotEmpty()
    @IsString()
    imagem: string;

    @IsNotEmpty()
    @IsString()
    bio: string;
    
    @IsNotEmpty()
    @IsString()
    nascimento: string;  
}
