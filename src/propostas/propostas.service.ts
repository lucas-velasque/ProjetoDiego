import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Proposta } from './entities/proposta.entity';
import { AnuncioVenda } from '../anunciosVenda/entities/anuncioVenda.entity';
import { AnuncioCompra } from '../anunciosCompra/entities/anuncioCompra.entity';
import { CreatePropostaDto } from './dto/createProposta.dto';
import { UpdatePropostaDto } from './dto/updateProposta.dto';
import { Op } from 'sequelize';

import { FiltroPropostaDto } from './dto/filtroPropostas.dto';
@Injectable()
export class PropostasService {
  constructor(
    @InjectModel(Proposta)
    private propostaModel: typeof Proposta,
    
    @InjectModel(AnuncioVenda)
    private anuncioVendaModel: typeof AnuncioVenda,
    
    @InjectModel(AnuncioCompra)
    private anuncioCompraModel: typeof AnuncioCompra,
  ) {}

  async criar(dto: CreatePropostaDto, tipo: string, anuncioId: number, usuarioId: number) {
    // Verificar se o anúncio existe
    const anuncio = await this.buscarAnuncio(tipo, anuncioId);
    
    if (!anuncio) {
      throw new NotFoundException(`Anúncio de ${tipo} com ID ${anuncioId} não encontrado`);
    }

    // Criar a proposta
    const proposta = await this.propostaModel.create({
      anuncio_tipo: tipo,
      anuncio_id: anuncioId,
      usuario_id: usuarioId,
      valor_proposto: dto.valor_proposto,
      mensagem: dto.mensagem,
      status: 'pendente',
    });

    return proposta;
  }

async listarPorAnuncio(tipo: string, anuncioId: number, filtros: FiltroPropostaDto) {
  // (paginação)
  const page = filtros.page || 1;
  const limit = filtros.limit || 10;
  const offset = (page - 1) * limit;

  // (filtros)
  const where: any = {
    anuncio_tipo: tipo,
    anuncio_id: anuncioId,
  };

  // Filtro de valor
  if (filtros.valor_min || filtros.valor_max) {
    where.valor_proposto = {};
    if (filtros.valor_min) {
      where.valor_proposto[Op.gte] = filtros.valor_min;
    }
    if (filtros.valor_max) {
      where.valor_proposto[Op.lte] = filtros.valor_max;
    }
  }

  // Filtro de status
  if (filtros.status) {
    where.status = filtros.status;
  }

  // 3. Buscar dados
  const { count, rows } = await this.propostaModel.findAndCountAll({
    where,
    limit,
    offset,
    order: [['created_at', 'DESC']],
  });

  // 4. Calcular meta
  const totalPages = Math.ceil(count / limit);

  // 5. Retornar resposta paginada
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
  async buscarPorId(id: number) {
    const proposta = await this.propostaModel.findByPk(id);

    if (!proposta) {
      throw new NotFoundException(`Proposta com ID ${id} não encontrada`);
    }

    return proposta;
  }

  async atualizar(id: number, dto: UpdatePropostaDto) {
    const proposta = await this.buscarPorId(id);

    if (proposta.status !== 'pendente') {
      throw new BadRequestException('Só é possível editar propostas pendentes');
    }

    await proposta.update({
      valor_proposto: dto.valor_proposto,
      mensagem: dto.mensagem,
    });

    return this.buscarPorId(id);
  }

  async deletar(id: number) {
    const proposta = await this.buscarPorId(id);
    await proposta.update({ status: 'cancelada' });
    return { message: 'Proposta cancelada com sucesso' };
  }

  async aceitar(id: number) {
    const proposta = await this.buscarPorId(id);

    if (proposta.status !== 'pendente') {
      throw new BadRequestException('Só é possível aceitar propostas pendentes');
    }

    await proposta.update({ status: 'aceita' });
    return this.buscarPorId(id);
  }

  private async buscarAnuncio(tipo: string, id: number) {
    if (tipo === 'venda') {
      return this.anuncioVendaModel.findByPk(id);
    } else if (tipo === 'compra') {
      return this.anuncioCompraModel.findByPk(id);
    }
    return null;
  }
}