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
<<<<<<< HEAD
import { FiltroLeilaoDto } from "./dto/filtro-leilao.dto";
=======
import { ListarLeiloesDto } from "./dto/listar-leiloes.dto";
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036

@Injectable()
export class LeiloesService {
  constructor(
    @InjectModel(Leilao) private leiloes: typeof Leilao,
    @InjectModel(Lance) private lances: typeof Lance,
  ) {}

  async criar(dados: CriarLeilaoDto) {
    return this.leiloes.create(dados as any);
  }

<<<<<<< HEAD
  async listar(filtros: FiltroLeilaoDto = {}) {
    const { page = 1, limit = 10, ...filters } = filtros;

    const where: any = {};

    // Filtro por título
    if (filters.titulo) {
      where.titulo = {
        [Op.iLike]: `%${filters.titulo}%`,
      };
=======
  async listar({
    titulo,
    page = 1,
    limit = 10,
    status,
    usuarioId,
    ganhadorId,
  }: ListarLeiloesDto) {
    const where: WhereOptions<Leilao> & {
      id_usuario?: number;
      ganhadorId?: number;
    } = {};

    if (titulo) {
      where.titulo = { [Op.iLike]: `%${titulo}%` };
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
    }
    if (status && (status === "aberto" || status === "encerrado")) {
      where.status = status as Leilao["status"];
    }
    if (usuarioId != null) where.id_usuario = usuarioId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (ganhadorId != null) where.ganhadorId = ganhadorId;

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
<<<<<<< HEAD
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
=======
      total: count,
      page: Number(page),
      lastPage: Math.ceil(count / limit),
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
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
<<<<<<< HEAD
    const leilao = await this.leiloes.findByPk(id);

    if (!leilao) {
      throw new NotFoundException(`Leilão com ID ${id} não encontrado`);
    }

    await this.leiloes.update(dados, { where: { id } });
    return await this.visualizar(id);
  }

  async deletar(id: number) {
    const leilao = await this.leiloes.findByPk(id);

    if (!leilao) {
      throw new NotFoundException(`Leilão com ID ${id} não encontrado`);
    }

    await this.leiloes.destroy({ where: { id } });
    return { message: 'Leilão removido com sucesso' };
=======
    return this.leiloes.update(dados as any, { where: { id } });
  }

  async deletar(id: number) {
    return this.leiloes.destroy({ where: { id } });
  }
  async darLance(id_usuario: number, id_leilao: number, valor: number) {
    const leilao = await this.leiloes.findOne({ where: { id: id_leilao } });
    if (!leilao) throw new NotFoundException("Leilão não encontrado");

    const agora = new Date();
    if (
      !leilao.ativo ||
      (leilao.terminaEm && new Date(leilao.terminaEm) < agora)
    ) {
      throw new BadRequestException("Leilão não está ativo");
    }

    if (leilao.id_usuario === id_usuario) {
      throw new ForbiddenException("Vendedor não pode dar lance");
    }

    const atual = Number(leilao.precoAtual ?? 0);
    const incremento = Number(leilao.valor_incremento ?? 0);
    const minimo = atual + incremento;

    if (Number(valor) <= atual || (incremento > 0 && Number(valor) < minimo)) {
      throw new BadRequestException(`Lance mínimo: ${minimo.toFixed(2)}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.lances.create({
      id_leilao: id_leilao.toString(),
      id_usuario,
      valor: Number(valor),
    } as any);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await leilao.update({ precoAtual: Number(valor) } as any);

    return { ok: true, precoAtual: Number(valor) };
  }

  // 2) Encerrar manualmente
  async encerrarManual(id: number) {
    const leilao = await this.leiloes.findByPk(id);
    if (!leilao) throw new NotFoundException("Leilão não encontrado");

    if (leilao.status && leilao.status === "encerrado") {
      return leilao; // já encerrado
    }

    // pega maior lance (se existir)
    const maiorLance = await this.lances.findOne({
      where: { id_leilao: id },
      order: [["valor", "DESC"]],
    });

    const updatePayload: Partial<Leilao> = {
      status: "encerrado",
      ativo: false,
      terminaEm: new Date(),
      precoAtual: maiorLance
        ? Number(maiorLance.valor)
        : (leilao.precoAtual ?? 0),
    };

    if (maiorLance) {
      updatePayload.ganhadorId = maiorLance.id_usuario;
    }

    await leilao.update(updatePayload);
    return leilao;
  }

  async leiloesVencidosPor(usuarioId: number) {
    return this.leiloes.findAll({
      where: {
        status: "encerrado",
        ganhadorId: usuarioId,
      } satisfies Partial<Leilao>,
      order: [["id", "DESC"]],
    });
  }

  async meusLeiloesAtivos(usuarioId: number) {
    return this.leiloes.findAll({
      where: { id_usuario: usuarioId, ativo: true },
      order: [["id", "DESC"]],
    });
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }
}
