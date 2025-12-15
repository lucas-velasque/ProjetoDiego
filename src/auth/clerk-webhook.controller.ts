import { Controller, Post, Headers, BadRequestException, Req } from '@nestjs/common';
import type { Request } from 'express';
import { Webhook } from 'svix';
import { UsersService } from '../users/users.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('webhooks/clerk')
export class ClerkWebhookController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async handleClerkWebhook(
    @Req() req: Request,
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
  ) {
    // Validar assinatura do webhook do Clerk
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new BadRequestException('CLERK_WEBHOOK_SECRET não configurado');
    }

    const webhook = new Webhook(WEBHOOK_SECRET);

    let payload: any;
    try {
      payload = webhook.verify(JSON.stringify(req.body), {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
    } catch (err) {
      console.error('Erro ao verificar assinatura do webhook:', err.message);
      throw new BadRequestException('Assinatura do webhook inválida');
    }

    const { type, data } = payload;

    console.log('Clerk webhook recebido:', type);

    // Quando um novo usuario e criado no Clerk
    if (type === 'user.created') {
      const { id: clerkId, email_addresses, first_name, last_name, username } = data;

      const primaryEmail = email_addresses.find((e: any) => e.id === data.primary_email_address_id);
      const email = primaryEmail?.email_address || '';

      const nome = [first_name, last_name].filter(Boolean).join(' ') || username || 'Usuario';

      console.log('Criando usuario no banco:', { clerkId, email, nome });

      try {
        // Verifica se usuario ja existe (por email ou clerk_id)
        const existingUser = await this.usersService.findOneByEmail(email);

        if (!existingUser) {
          await this.usersService.create({
            clerk_id: clerkId,
            email,
            nome,
            username: username || email.split('@')[0],
            senha: '', // Clerk gerencia senha, nao precisamos salvar
            status: 'ativo',
            nivel_usuario_id: null, // Não definir nível de usuário por enquanto
          });

          console.log('Usuario criado com sucesso no banco');
        } else {
          console.log('Usuario ja existe no banco');
        }
      } catch (error) {
        console.error('Erro ao criar usuario no banco:', error.message);
        throw new BadRequestException('Erro ao processar webhook');
      }
    }

    // Quando um usuario e atualizado no Clerk
    if (type === 'user.updated') {
      const { id: clerkId, email_addresses, first_name, last_name } = data;

      const primaryEmail = email_addresses.find((e: any) => e.id === data.primary_email_address_id);
      const email = primaryEmail?.email_address || '';

      const nome = [first_name, last_name].filter(Boolean).join(' ');

      console.log('Atualizando usuario no banco:', { clerkId, email, nome });

      try {
        const user = await this.usersService.findOneByClerkId(clerkId);

        if (user) {
          await this.usersService.update(user.id, { email, nome });
          console.log('Usuario atualizado com sucesso');
        }
      } catch (error) {
        console.error('Erro ao atualizar usuario:', error.message);
      }
    }

    return { received: true };
  }
}
