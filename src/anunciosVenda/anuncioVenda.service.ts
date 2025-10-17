import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnuncioVenda } from './entities/anuncioVenda.entity';
import { AnuncioVendaCarta } from './entities/anuncioVendaCarta.entity';
import { CreateAnuncioVendaDto } from './dto/createAnuncioVenda.dto';
import { UpdateAnuncioVendaDto } from './dto/updateAnuncioVenda.dto';
import { Op } from 'sequelize';
import { FiltroAnuncioVendaDto } from './dto/filtroAnuncioVenda.dto';
import { Carta } from '../cartas/entities/carta.entity';

@Injectable()
export class AnunciosVendaService {
  constructor(
    @InjectModel(AnuncioVenda)
    private anuncioVendaModel: typeof AnuncioVenda,
    @InjectModel(AnuncioVendaCarta)
    private anuncioVendaCartaModel: typeof AnuncioVendaCarta,
  ) {}

  async criar(dto: CreateAnuncioVendaDto, usuarioId: number) {
    // Criar o anúncio
    const anuncio = await this.anuncioVendaModel.create({
      usuario_id: usuarioId,
      titulo: dto.titulo,
      descricao: dto.descricao,
      preco_total: dto.preco_total,
      quantidade_disponivel: dto.quantidade_disponivel,
      status: 'ativo',
    });

    // Criar as cartas do anúncio
    if (dto.cartas && dto.cartas.length > 0) {
      const cartas = dto.cartas.map((carta) => ({
        anuncio_venda_id: anuncio.id,
        carta_id: carta.carta_id,
        quantidade: carta.quantidade,
        condicao: carta.condicao || 'Near Mint',
        observacoes: carta.observacoes,
      }));

      await this.anuncioVendaCartaModel.bulkCreate(cartas);
    }

    // Retornar anúncio com as cartas
    return this.buscarPorId(anuncio.id);
  }

async listarTodos(filtros: FiltroAnuncioVendaDto) {
  // 1. Calcular OFFSET (paginação)
  const page = filtros.page || 1;
  const limit = filtros.limit || 10;
  const offset = (page - 1) * limit;

  const where: any = {};

  // Filtro de preço
  if (filtros.preco_min || filtros.preco_max) {
    where.preco_total = {};
    if (filtros.preco_min) {
      where.preco_total[Op.gte] = filtros.preco_min;
    }
    if (filtros.preco_max) {
      where.preco_total[Op.lte] = filtros.preco_max;
    }
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

  const include: any = [
    {
      model: AnuncioVendaCarta,
      as: 'cartas',
      include: [
        {
          model: Carta,
          as: 'carta',
        },
      ],
    },
  ];

  const whereCartas: any = {};
  const whereCartaInfo: any = {};

  if (filtros.condicao) {
    whereCartas.condicao = filtros.condicao;
  }

  if (filtros.nome_carta) {
    whereCartaInfo.nome = { [Op.like]: `%${filtros.nome_carta}%` };
  }

  if (filtros.raridade) {
    whereCartaInfo.raridade = filtros.raridade;
  }

  if (Object.keys(whereCartas).length > 0) {
    include[0].where = whereCartas;
    include[0].required = true;
  }

  if (Object.keys(whereCartaInfo).length > 0) {
    include[0].include[0].where = whereCartaInfo;
    include[0].include[0].required = true;
  }

  // 4. Buscar dados
  const { count, rows } = await this.anuncioVendaModel.findAndCountAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
    order: [['created_at', 'DESC']],
  });

  // 5. Calcular meta
  const totalPages = Math.ceil(count / limit);

  // 6. Retornar resposta paginada
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
    const anuncio = await this.anuncioVendaModel.findByPk(id, {
      include: [AnuncioVendaCarta],
    });

    if (!anuncio) {
      throw new NotFoundException(`Anúncio com ID ${id} não encontrado`);
    }

    return anuncio;
  }

  async atualizar(id: number, dto: UpdateAnuncioVendaDto) {
    const anuncio = await this.buscarPorId(id);

    await anuncio.update({
      titulo: dto.titulo,
      descricao: dto.descricao,
      preco_total: dto.preco_total,
      quantidade_disponivel: dto.quantidade_disponivel,
    });

    return this.buscarPorId(id);
  }

  async deletar(id: number) {
    const anuncio = await this.buscarPorId(id);
    await anuncio.update({ status: 'cancelado' });
    return { message: 'Anúncio cancelado com sucesso' };
  }
}