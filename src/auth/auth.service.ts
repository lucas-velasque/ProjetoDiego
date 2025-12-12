import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
<<<<<<< HEAD
    password: string,
  ): Promise<{ access_token: string; user: any }> {
    // Buscar usuário por username
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar se usuário está ativo
    if (user.status !== 'ativo') {
      throw new UnauthorizedException('Usuário inativo ou bloqueado');
    }

    // Validar senha usando bcrypt
    const isPasswordValid = await this.usersService.validatePassword(
      password,
      user.senha,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Criar payload do JWT
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      nivel_usuario_id: user.nivel_usuario_id,
    };

    // Retornar token e dados do usuário (sem senha)
=======
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    
    if (!user || !(await user.validatePassword(pass))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    
    const payload = { sub: user.id, username: user.username, role: user.role };
    
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        nome: user.nome,
        username: user.username,
        email: user.email,
        nivel_usuario_id: user.nivel_usuario_id,
        pontuacao: user.pontuacao,
        status: user.status,
        nivelUsuario: user.nivelUsuario,
      },
    };
  }

<<<<<<< HEAD
  async validateUser(userId: number) {
    return await this.usersService.findOne(userId);
=======
  async signUp(username: string, password: string): Promise<User> {
    return this.usersService.create({ username, password });
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }
}
