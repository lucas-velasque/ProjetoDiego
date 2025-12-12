// src/leiloes/leiloes.service.ts
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Leilao } from "./entities/leilao.model";
import { Lance } from "./entities/lance.model";
import { Op, WhereOptions } from "sequelize";
import { CriarLeilaoDto } from "./dto/criar-leilao.dto";
import { AtualizarLeilaoDto } from "./dto/atualizar-leilao.dto";
import { FiltroLeilaoDto } from "./dto/filtro-leilao.dto";

@Injectable()
export class LeiloesService {
  constructor(
    @InjectModel(Leilao) private leiloes: typeof Leilao,
    @InjectModel(Lance) private lances: typeof Lance,
  ) {}

  async criar(dados: CriarLeilaoDto) {
    return this.leiloes.create(dados as any);
  }

  async listar(filtros: FiltroLeilaoDto = {}) {
    const { page = 1, limit = 10, ...filters } = filtros;

    const where: any = {};

    // Filtro por título
    if (filters.titulo) {
      where.titulo = {
        [Op.iLike]: `%${filters.titulo}%`,
      };
    }

    // Filtro por status
    if (filters.status) {
      where.status = filters.status;
    }

    // Filtro por categoria
    if (filters.categoria_id) {
      where.categoria_id = filters.categoria_id;
    }

    // Filtro por lance inicial (range)
    if (filters.lance_inicial_min !== undefined || filters.lance_inicial_max !== undefined) {
      where.lance_inicial = {};
      if (filters.lance_inicial_min !== undefined) {
        where.lance_inicial[Op.gte] = filters.lance_inicial_min;
      }
      if (filters.lance_inicial_max !== undefined) {
        where.lance_inicial[Op.lte] = filters.lance_inicial_max;
      }
    }

    // Filtro por data de criação
    if (filters.data_inicio || filters.data_fim) {
      where.created_at = {};
      if (filters.data_inicio) {
        where.created_at[Op.gte] = new Date(filters.data_inicio);
      }
      if (filters.data_fim) {
        where.created_at[Op.lte] = new Date(filters.data_fim);
      }
    }

    // Filtro por data de término do leilão
    if (filters.data_termino_inicio || filters.data_termino_fim) {
      where.data_termino = {};
      if (filters.data_termino_inicio) {
        where.data_termino[Op.gte] = new Date(filters.data_termino_inicio);
      }
      if (filters.data_termino_fim) {
        where.data_termino[Op.lte] = new Date(filters.data_termino_fim);
      }
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await this.leiloes.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["created_at", "DESC"]],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async visualizar(id: number) {
    const leilao = await this.leiloes.findOne({
      where: { id },
      include: [{ model: Lance, as: "lances" }],
    });

    if (!leilao) {
      throw new NotFoundException(`Leilão com ID ${id} não encontrado`);
    }

    return leilao;
  }

  async atualizar(id: number, dados: AtualizarLeilaoDto) {
    const leilao = await this.leiloes.findByPk(id);

    if (!leilao) {
      throw new NotFoundException(`Leilão com ID ${id} não encontrado`);
    }

    await this.leiloes.update(dados as any, { where: { id } });
    return await this.visualizar(id);
  }

  async deletar(id: number) {
    const leilao = await this.leiloes.findByPk(id);

    if (!leilao) {
      throw new NotFoundException(`Leilão com ID ${id} não encontrado`);
    }

    await this.leiloes.destroy({ where: { id } });
    return { message: 'Leilão removido com sucesso' };
  }

  async darLance(usuarioId: number, leilaoId: number, valor: number) {
    const leilao = await this.leiloes.findByPk(leilaoId);

    if (!leilao) {
      throw new NotFoundException(`Leilão com ID ${leilaoId} não encontrado`);
    }

    if (leilao.status !== 'aberto') {
      throw new BadRequestException('Leilão não está aberto para lances');
    }

    if (valor <= leilao.precoInicial) {
      throw new BadRequestException('O lance deve ser maior que o preço inicial');
    }

    const lance = await this.lances.create({
      id_leilao: leilaoId,
      id_usuario: usuarioId,
      valor,
    } as any);

    return { lance, leilao };
  }

  async encerrarManual(id: number) {
    const leilao = await this.leiloes.findByPk(id, {
      include: [{ model: Lance, as: 'lances' }],
    });

    if (!leilao) {
      throw new NotFoundException(`Leilão com ID ${id} não encontrado`);
    }

    if (leilao.status === 'encerrado') {
      throw new BadRequestException('Leilão já está encerrado');
    }

    await leilao.update({ status: 'encerrado' });
    return leilao;
  }

  async leiloesVencidosPor(usuarioId: number) {
    const leiloes = await this.leiloes.findAll({
      where: {
        status: 'encerrado',
      },
      include: [
        {
          model: Lance,
          as: 'lances',
          where: { id_usuario: usuarioId },
          required: true,
        },
      ],
    });

    return leiloes;
  }

  async meusLeiloesAtivos(usuarioId: number) {
    const leiloes = await this.leiloes.findAll({
      where: {
        id_usuario: usuarioId,
        status: 'aberto',
      },
    });

    return leiloes;
  }
}
