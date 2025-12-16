import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { verifyToken } from "@clerk/backend";
import { IS_PUBLIC_KEY } from "../common/decorators/public.decorator";
import { UsersService } from "../users/users.service";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verificar se a rota é pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token não fornecido");
    }

    try {
      // Validar token do Clerk
      const clerkSecretKey = process.env.CLERK_SECRET_KEY;

      if (!clerkSecretKey) {
        console.error("CLERK_SECRET_KEY não configurada no ambiente");
        throw new UnauthorizedException(
          "Configuração de autenticação inválida",
        );
      }

      const payload = await verifyToken(token, {
        secretKey: clerkSecretKey,
      });

      // Extrair Clerk ID do payload
      const clerkId = payload.sub;

      if (!clerkId) {
        throw new UnauthorizedException(
          "Token inválido: clerkId não encontrado",
        );
      }

      // Buscar ou criar usuário no banco
      let user = await this.usersService.findOneByClerkId(clerkId);

      if (!user) {
        // Usuário não existe no banco, criar automaticamente
        console.log(
          "Criando usuário automaticamente via ClerkAuthGuard:",
          clerkId,
        );

        // Extrair informações do token do Clerk
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const email = (payload as any).email || `${clerkId}@clerk.user`;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const firstName = (payload as any).first_name || "";
        const lastName = (payload as any).last_name || "";
        const nome =
          [firstName, lastName].filter(Boolean).join(" ") || "Usuário";
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const username =
          (payload as any).username || email.split("@")[0] || clerkId;

        user = await this.usersService.create({
          clerk_id: clerkId,
          email,
          nome,
          username,
          senha: "", // Clerk gerencia senha
          status: "ativo",
          nivel_usuario_id: null, // Não definir nível de usuário por enquanto
        });

        console.log("Usuário criado com sucesso:", user.id);
      }

      // Adicionar informações do usuário no request
      request["user"] = {
        sub: user.id, // ID do banco de dados
        clerkId: clerkId,
        username: user.username,
        email: user.email,
        nivel_usuario_id: user.nivel_usuario_id,
      };

      return true;
    } catch (error) {
      console.error("Erro ao validar token do Clerk:", error.message);
      throw new UnauthorizedException("Token inválido ou expirado");
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
