import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Stripe from 'stripe';
import { Pedido } from '../carrinho/entities/pedido.entity';
import { PedidoItem } from '../carrinho/entities/pedidoItem.entity';
import { AnuncioVenda } from '../anunciosVenda/entities/anuncioVenda.entity';

@Injectable()
export class PagamentoService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Pedido)
    private pedidoModel: typeof Pedido,
  ) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      console.warn('STRIPE_SECRET_KEY não configurada. Pagamentos não funcionarão.');
    }
    
    this.stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
      apiVersion: '2023-10-16' as any,
    });
  }

  /**
   * Cria uma sessão de checkout do Stripe para um pedido
   */
  async criarSessaoCheckout(pedidoId: number, usuarioId: number): Promise<{ url: string | null; sessionId: string }> {
    // Buscar pedido com itens
    const pedido = await this.pedidoModel.findOne({
      where: {
        id: pedidoId,
        usuario_id: usuarioId,
      },
      include: [
        {
          model: PedidoItem,
          as: 'itens',
          include: [
            {
              model: AnuncioVenda,
              as: 'anuncio',
            },
          ],
        },
      ],
    });

    if (!pedido) {
      throw new BadRequestException('Pedido não encontrado');
    }

    if (pedido.status !== 'pendente') {
      throw new BadRequestException('Este pedido já foi processado');
    }

    // Criar line items para o Stripe
    const lineItems = pedido.itens.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.anuncio.titulo,
          description: item.anuncio.descricao || 'Carta Pokémon',
        },
        unit_amount: Math.round(Number(item.preco_unitario) * 100), // Stripe usa centavos
      },
      quantity: item.quantidade,
    }));

    // URL base do frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

    // Criar sessão de checkout
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${frontendUrl}/pedidos/${pedidoId}?success=true`,
      cancel_url: `${frontendUrl}/cart?canceled=true`,
      metadata: {
        pedidoId: pedidoId.toString(),
        usuarioId: usuarioId.toString(),
      },
    });

    // Atualizar pedido com ID da sessão do Stripe
    await pedido.update({
      stripe_session_id: session.id,
    });

    return {
      url: session.url,
      sessionId: session.id,
    };
  }

  /**
   * Processa webhook do Stripe para confirmar pagamento
   */
  async processarWebhook(payload: Buffer, signature: string): Promise<{ received: boolean }> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new BadRequestException('Webhook secret não configurado');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    // Processar evento
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'checkout.session.expired':
        await this.handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
        break;

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return { received: true };
  }

  /**
   * Trata checkout completado com sucesso
   */
  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const pedidoId = session.metadata?.pedidoId;

    if (!pedidoId) {
      console.error('Pedido ID não encontrado no metadata da sessão');
      return;
    }

    const pedido = await this.pedidoModel.findByPk(parseInt(pedidoId));

    if (!pedido) {
      console.error(`Pedido ${pedidoId} não encontrado`);
      return;
    }

    // Atualizar status do pedido para pago
    await pedido.update({
      status: 'pago',
      stripe_payment_intent_id: session.payment_intent as string,
    });

    console.log(`Pedido ${pedidoId} marcado como pago`);
  }

  /**
   * Trata checkout expirado
   */
  private async handleCheckoutExpired(session: Stripe.Checkout.Session) {
    const pedidoId = session.metadata?.pedidoId;

    if (!pedidoId) {
      return;
    }

    const pedido = await this.pedidoModel.findByPk(parseInt(pedidoId));

    if (pedido && pedido.status === 'pendente') {
      // Podemos cancelar o pedido ou deixar pendente para nova tentativa
      console.log(`Sessão de checkout expirada para pedido ${pedidoId}`);
    }
  }

  /**
   * Verifica status de uma sessão de checkout
   */
  async verificarStatusSessao(sessionId: string): Promise<{ status: string | null; paymentStatus: string }> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);

    return {
      status: session.status,
      paymentStatus: session.payment_status,
    };
  }
}
