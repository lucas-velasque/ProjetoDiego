import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnuncioCompra } from './entities/anuncioCompra.entity';
import { CreateAnuncioCompraDto } from './dto/createAnuncioCompra.dto';
import { UpdateAnuncioCompraDto } from './dto/updateAnuncioCompra.dto';
import { Op } from 'sequelize';
import { FiltroAnuncioCompraDto } from './dto/filtroAnuncioCompra.dto';

@Injectable()
export class AnunciosCompraService {
  constructor(
    @InjectModel(AnuncioCompra)
    private anuncioCompraModel: typeof AnuncioCompra,
  ) {}

  async criar(dto: CreateAnuncioCompraDto, usuarioId: number) {
    const anuncio = await this.anuncioCompraModel.create({
      usuario_id: usuarioId,
      nome_carta: dto.nome_carta,
      expansao: dto.expansao,
      numero_expansao: dto.numero_expansao,
      raridade: dto.raridade,
      edicao: dto.edicao,
      quantidade: dto.quantidade,
      preco_maximo: dto.preco_maximo,
      condicao_minima: dto.condicao_minima,
      descricao: dto.descricao,
      status: 'ativo',
    });

    return anuncio;
  }

async listarTodos(filtros: FiltroAnuncioCompraDto) {
  // (paginação)
  const page = filtros.page || 1;
  const limit = filtros.limit || 10;
  const offset = (page - 1) * limit;

  // (filtros)
  const where: any = {};

  // Filtro de nome da carta
  if (filtros.nome_carta) {
    where.nome_carta = { [Op.like]: `%${filtros.nome_carta}%` };
  }

  // Filtro de raridade
  if (filtros.raridade) {
    where.raridade = filtros.raridade;
  }

  // Filtro de preço máximo
  if (filtros.preco_maximo) {
    where.preco_maximo = { [Op.lte]: filtros.preco_maximo };
  }

  // Filtro de status
  if (filtros.status) {
    where.status = filtros.status;
  } else {
    where.status = 'ativo'; // Padrão: só ativos
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

  // 3. Buscar dados
  const { count, rows } = await this.anuncioCompraModel.findAndCountAll({
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
    const anuncio = await this.anuncioCompraModel.findByPk(id);

    if (!anuncio) {
      throw new NotFoundException(`Anúncio de compra com ID ${id} não encontrado`);
    }

    return anuncio;
  }

  async atualizar(id: number, dto: UpdateAnuncioCompraDto, usuarioId: number) {
    const anuncio = await this.buscarPorId(id);

    // Validar propriedade do anúncio
    if (anuncio.usuario_id !== usuarioId) {
      throw new ForbiddenException('Você não tem permissão para editar este anúncio');
    }

    await anuncio.update({
      nome_carta: dto.nome_carta,
      expansao: dto.expansao,
      numero_expansao: dto.numero_expansao,
      raridade: dto.raridade,
      edicao: dto.edicao,
      quantidade: dto.quantidade,
      preco_maximo: dto.preco_maximo,
      condicao_minima: dto.condicao_minima,
      descricao: dto.descricao,
    });

    return this.buscarPorId(id);
  }

  async deletar(id: number, usuarioId: number) {
    const anuncio = await this.buscarPorId(id);

    // Validar propriedade do anúncio
    if (anuncio.usuario_id !== usuarioId) {
      throw new ForbiddenException('Você não tem permissão para deletar este anúncio');
    }

    await anuncio.update({ status: 'cancelado' });
    return { message: 'Anúncio de compra cancelado com sucesso' };
  }
}