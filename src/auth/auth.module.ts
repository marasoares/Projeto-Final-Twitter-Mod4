/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { LoginDto } from './dto/login.dto';


@Module({
    imports: [
        UsuarioModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: 'process.env.SECRETKEY',
            signOptions: {
                expiresIn: '300s',
            },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [PassportModule, JwtModule],
})
export class AuthModule {}
