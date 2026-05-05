//Puedo tener mas de una estrategia de autenticacion, por ejemplo, una estrategia para autenticacion con JWT, otra para autenticacion con Google, etc. En este caso, vamos a crear una estrategia de autenticacion local, es decir, con email y password.

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
  super(
    {
      usernameField: 'email',
      passwordField: 'password',
    }
  );
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    return user;
  }
}
