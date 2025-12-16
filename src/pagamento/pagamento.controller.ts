import {
  Controller,
  Post,
  Get,
  Param,
  Req,
  Res,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { PagamentoService } from './pagamento.service';
import { UsuarioAtual } from '../common/decorators/usuarioAtual.decorator';
import { Public } from '../common/decorators/public.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('pagamento')
@Controller('pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  /**
   * Cria uma sessão de checkout do Stripe para um pedido
   */
  @Post('checkout/:pedidoId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar sessão de checkout',
    description: 'Cria uma sessão de checkout do Stripe para processar o pagamento de um pedido',
  })
  @ApiParam({ name: 'pedidoId', type: Number, description: 'ID do pedido' })
  @ApiResponse({ status: 200, description: 'Sessão criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Pedido inválido ou já processado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async criarCheckout(
    @Param('pedidoId') pedidoId: string,
    @UsuarioAtual() usuario: any,
  ) {
    const usuarioId = usuario.sub;
    return this.pagamentoService.criarSessaoCheckout(+pedidoId, usuarioId);
  }

  /**
   * Webhook do Stripe para processar eventos de pagamento
   */
  @Post('webhook')
  @Public()
  @ApiOperation({
    summary: 'Webhook do Stripe',
    description: 'Endpoint para receber eventos do Stripe (pagamentos confirmados, etc)',
  })
  @ApiResponse({ status: 200, description: 'Evento processado' })
  @ApiResponse({ status: 400, description: 'Erro ao processar evento' })
  async webhook(
    @Req() req: any,
    @Res() res: any,
    @Headers('stripe-signature') signature: string,
  ) {
    try {
      if (!req.rawBody) {
        throw new BadRequestException('Raw body não disponível');
      }
      
      const result = await this.pagamentoService.processarWebhook(
        req.rawBody,
        signature,
      );
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('Erro no webhook:', error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * Verifica status de uma sessão de checkout
   */
  @Get('status/:sessionId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Verificar status do pagamento',
    description: 'Verifica o status de uma sessão de checkout do Stripe',
  })
  @ApiParam({ name: 'sessionId', type: String, description: 'ID da sessão do Stripe' })
  @ApiResponse({ status: 200, description: 'Status retornado com sucesso' })
  async verificarStatus(@Param('sessionId') sessionId: string) {
    return this.pagamentoService.verificarStatusSessao(sessionId);
  }
}
