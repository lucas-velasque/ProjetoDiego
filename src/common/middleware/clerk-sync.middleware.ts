import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class ClerkSyncMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Pegar dados do usuário do Clerk (já decodificado pelo AuthGuard)
      const user = (req as any).user;

      if (!user || !user.clerkId) {
        return next();
      }

      // Verificar se usuário existe no banco
      let dbUser = await this.usersService.findOneByClerkId(user.clerkId);

      // Se não existir, criar automaticamente
      if (!dbUser) {
        console.log('Usuário não encontrado no banco, criando...', {
          clerkId: user.clerkId,
          email: user.email,
        });

        dbUser = await this.usersService.create({
          clerk_id: user.clerkId,
          email: user.email || `${user.clerkId}@clerk.user`,
          nome: user.name || user.email?.split('@')[0] || 'Usuário',
          username: user.username || user.email?.split('@')[0] || user.clerkId,
          senha: '', // Clerk gerencia senha
          status: 'ativo',
        });

        console.log('Usuário criado com sucesso no banco:', dbUser.id);
      }

      // Adicionar o ID do banco no request para uso posterior
      (req as any).user.sub = dbUser.id;
    } catch (error) {
      console.error('Erro ao sincronizar usuário:', error.message);
    }

    next();
  }
}
