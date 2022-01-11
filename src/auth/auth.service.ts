import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
    constructor(
        // eslint-disable-next-line prettier/prettier
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginUserDto: LoginDto) {
        const user = await this.usuarioService.findByLogin(loginUserDto);

        const token = this._createToken(user);

        return{
            email: user.email,
            ...token
        }
    }
 
    private _createToken({ email }: LoginDto): any {
        const user: JwtPayload = { email };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,
        }
    }
}
