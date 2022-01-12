import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Usuario } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UsuarioService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto): Promise<CreateUsuarioDto> {
    data.senha = await bcrypt.hash(data.senha, 10);
    return await this.prisma.usuario.create({ data });
  }

  async findByLogin(login: LoginDto): Promise<Usuario> {
    const user = await this.prisma.usuario.findFirst({
      where: {
        email: login.email,
      }
    })

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const senhaIgual = await bcrypt.compare(login.senha, user.senha);

    if (!senhaIgual) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async createPrisma(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.prisma.usuario.create({
      data: { ...createUsuarioDto },
    });
  }

  async findAllPrisma(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }

  async findOnePrisma(id: number): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({ where: { id } });
  }

  async updatePrisma(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return await this.prisma.usuario.update({
      data: { ...updateUsuarioDto },
      where: { id },
    });
  }

  async removePrisma(id: number) {
    return await this.prisma.usuario.delete({ where: { id } });
  }
}