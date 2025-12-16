import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarrinhoItem } from './entities/carrinhoItem.entity';
import { Pedido } from './entities/pedido.entity';
import { PedidoItem } from './entities/pedidoItem.entity';
import { AnuncioVenda } from '../anunciosVenda/entities/anuncioVenda.entity';
import { AdicionarCarrinhoDto } from './dto/adicionarCarrinho.dto';
import { FiltroPedidoDto } from './dto/filtroPedido.dto';
import { Op } from 'sequelize';
import Stripe from 'stripe';

@Injectable()
export class CarrinhoService {
  private stripe: Stripe;

  constructor(
    @InjectModel(CarrinhoItem)
    private carrinhoItemModel: typeof CarrinhoItem,

    @InjectModel(Pedido)
    private pedidoModel: typeof Pedido,

    @InjectModel(PedidoItem)
    private pedidoItemModel: typeof PedidoItem,

    @InjectModel(AnuncioVenda)
    private anuncioVendaModel: typeof AnuncioVenda,
  ) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (stripeSecretKey && !stripeSecretKey.includes('SUBSTITUA')) {
      this.stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2023-10-16' as any,
      });
    }
  }

  // 1. ADICIONAR AO CARRINHO
  async adicionarAoCarrinho(dto: AdicionarCarrinhoDto, usuarioId: number) {
    // Verificar se anúncio existe e está ativo
    const anuncio = await this.anuncioVendaModel.findByPk(dto.anuncio_venda_id);

    if (!anuncio) {
      throw new NotFoundException('Anúncio não encontrado');
    }

    if (anuncio.status !== 'ativo') {
      throw new BadRequestException('Este anúncio não está mais disponível');
    }

    // Verificar se tem quantidade disponível
    if (dto.quantidade > anuncio.quantidade_disponivel) {
      throw new BadRequestException(
        `Quantidade indisponível. Disponível: ${anuncio.quantidade_disponivel}`,
      );
    }

    // Verificar se já existe no carrinho
    const itemExistente = await this.carrinhoItemModel.findOne({
      where: {
        usuario_id: usuarioId,
        anuncio_venda_id: dto.anuncio_venda_id,
      },
    });

    if (itemExistente) {
      // Atualizar quantidade
      const novaQuantidade = itemExistente.quantidade + dto.quantidade;

      if (novaQuantidade > anuncio.quantidade_disponivel) {
        throw new BadRequestException(
          `Quantidade total excede o disponível. Disponível: ${anuncio.quantidade_disponivel}`,
        );
      }

      await itemExistente.update({ quantidade: novaQuantidade });
      return itemExistente;
    }

    // Criar novo item no carrinho
    return this.carrinhoItemModel.create({
      usuario_id: usuarioId,
      anuncio_venda_id: dto.anuncio_venda_id,
      quantidade: dto.quantidade,
    });
  }

  // 2. REMOVER DO CARRINHO
  async removerDoCarrinho(itemId: number, usuarioId: number) {
    const item = await this.carrinhoItemModel.findOne({
      where: {
        id: itemId,
        usuario_id: usuarioId,
      },
    });

    if (!item) {
      throw new NotFoundException('Item não encontrado no seu carrinho');
    }

    await item.destroy();
    return { message: 'Item removido do carrinho' };
  }

  // 3. VER CARRINHO
  async verCarrinho(usuarioId: number) {
    const itens = await this.carrinhoItemModel.findAll({
      where: { usuario_id: usuarioId },
      include: [
        {
          model: AnuncioVenda,
          as: 'anuncio',
        },
      ],
      order: [['created_at', 'DESC']],
    });

    // Calcular total
    const valorTotal = itens.reduce((total, item) => {
      return total + item.quantidade * Number(item.anuncio.preco_total);
    }, 0);

    return {
      itens,
      resumo: {
        total_itens: itens.length,
        valor_total: valorTotal,
      },
    };
  }

  // 4. CHECKOUT (FINALIZAR COMPRA) - Agora com integração Stripe
  async checkout(usuarioId: number) {
    // Buscar itens do carrinho
    const itens = await this.carrinhoItemModel.findAll({
      where: { usuario_id: usuarioId },
      include: [
        {
          model: AnuncioVenda,
          as: 'anuncio',
        },
      ],
    });

    if (itens.length === 0) {
      throw new BadRequestException('Carrinho vazio');
    }

    // Validar disponibilidade e calcular total
    let valorTotal = 0;

    for (const item of itens) {
      const anuncio = item.anuncio;

      if (anuncio.status !== 'ativo') {
        throw new BadRequestException(`Anúncio "${anuncio.titulo}" não está mais disponível`);
      }

      if (item.quantidade > anuncio.quantidade_disponivel) {
        throw new BadRequestException(
          `Anúncio "${anuncio.titulo}" não tem quantidade suficiente. Disponível: ${anuncio.quantidade_disponivel}`,
        );
      }

      valorTotal += item.quantidade * Number(anuncio.preco_total);
    }

    // Criar pedido
    const pedido = await this.pedidoModel.create({
      usuario_id: usuarioId,
      valor_total: valorTotal,
      status: 'pendente',
    });

    // Criar itens do pedido
    for (const item of itens) {
      await this.pedidoItemModel.create({
        pedido_id: pedido.id,
        anuncio_venda_id: item.anuncio_venda_id,
        preco_unitario: item.anuncio.preco_total,
        quantidade: item.quantidade,
      });

      // Atualizar quantidade disponível do anúncio
      const novaQuantidade = item.anuncio.quantidade_disponivel - item.quantidade;
      await item.anuncio.update({ quantidade_disponivel: novaQuantidade });

      // Se zerou a quantidade, marcar como vendido
      if (novaQuantidade === 0) {
        await item.anuncio.update({ status: 'vendido' });
      }
    }

    // Limpar carrinho
    await this.carrinhoItemModel.destroy({
      where: { usuario_id: usuarioId },
    });

    // Se Stripe estiver configurado, criar sessão de checkout
    if (this.stripe) {
      try {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
        
        const lineItems = itens.map((item) => ({
          price_data: {
            currency: 'brl',
            product_data: {
              name: item.anuncio.titulo,
              description: item.anuncio.descricao || 'Carta Pokémon',
            },
            unit_amount: Math.round(Number(item.anuncio.preco_total) * 100),
          },
          quantity: item.quantidade,
        }));

        const session = await this.stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: `${frontendUrl}/pedidos/${pedido.id}?success=true`,
          cancel_url: `${frontendUrl}/cart?canceled=true`,
          metadata: {
            pedidoId: pedido.id.toString(),
            usuarioId: usuarioId.toString(),
          },
        });

        // Atualizar pedido com ID da sessão
        await pedido.update({ stripe_session_id: session.id });

        // Retornar pedido com URL do Stripe
        const pedidoCompleto = await this.pedidoModel.findByPk(pedido.id, {
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

        return {
          pedido: pedidoCompleto,
          checkout_url: session.url,
          session_id: session.id,
        };
      } catch (error) {
        console.error('Erro ao criar sessão Stripe:', error);
        // Continuar sem Stripe se houver erro
      }
    }

    // Retornar pedido sem Stripe
    return this.pedidoModel.findByPk(pedido.id, {
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
  }

  // 5. LISTAR PEDIDOS
  async listarPedidos(usuarioId: number, filtros: FiltroPedidoDto) {
    const page = filtros.page || 1;
    const limit = filtros.limit || 10;
    const offset = (page - 1) * limit;

    const where: any = { usuario_id: usuarioId };

    // Filtro de status
    if (filtros.status) {
      where.status = filtros.status;
    }

    // Filtro de data
    if (filtros.data_inicio || filtros.data_fim) {
      where.created_at = {};
      if (filtros.data_inicio) {
        where.created_at[Op.gte] = new Date(filtros.data_inicio);
      }
      if (filtros.data_fim) {
        where.created_at[Op.lte] = new Date(filtros.data_fim);
      }
    }

    const { count, rows } = await this.pedidoModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });

    const totalPages = Math.ceil(count / limit);

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages,
      },
    };
  }

  // 6. DETALHAR PEDIDO
  async detalharPedido(pedidoId: number, usuarioId: number) {
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
      throw new NotFoundException('Pedido não encontrado');
    }

    return pedido;
  }

  // 7. CANCELAR PEDIDO
  async cancelarPedido(pedidoId: number, usuarioId: number) {
    const pedido = await this.pedidoModel.findOne({
      where: {
        id: pedidoId,
        usuario_id: usuarioId,
      },
      include: [
        {
          model: PedidoItem,
          as: 'itens',
        },
      ],
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (pedido.status === 'cancelado') {
      throw new BadRequestException('Pedido já está cancelado');
    }

    if (pedido.status === 'entregue') {
      throw new BadRequestException('Não é possível cancelar pedido já entregue');
    }

    // Atualizar status
    await pedido.update({ status: 'cancelado' });

    // Devolver quantidade aos anúncios (se ainda pendente ou pago)
    if (pedido.status === 'pendente' || pedido.status === 'pago') {
      for (const item of pedido.itens) {
        const anuncio = await this.anuncioVendaModel.findByPk(item.anuncio_venda_id);
        if (anuncio) {
          const novaQuantidade = anuncio.quantidade_disponivel + item.quantidade;
          await anuncio.update({
            quantidade_disponivel: novaQuantidade,
            status: 'ativo',
          });
        }
      }
    }

    return this.detalharPedido(pedidoId, usuarioId);
  }
}
