import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorator customizado para extrair o usuário autenticado do JWT
export const UsuarioAtual = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Obtém a requisição HTTP do contexto de execução
    const request = ctx.switchToHttp().getRequest();

    // Retorna o usuário que foi anexado à requisição pelo AuthGuard
    // O payload do JWT contém: { sub: user.id, username: user.username, role: user.role }
    return request.user;
  },
);
