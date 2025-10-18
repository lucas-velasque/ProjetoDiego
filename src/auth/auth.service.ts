
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    
    if (!user || !(await user.validatePassword(pass))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    
    const payload = { sub: user.id, username: user.username, role: user.role };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string): Promise<User> {
    return this.usersService.create({ username, password });
  }
}
