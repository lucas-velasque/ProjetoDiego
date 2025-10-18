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
import { ListarLeiloesDto } from "./dto/listar-leiloes.dto";

@Injectable()
export class LeiloesService {
  constructor(
    @InjectModel(Leilao) private leiloes: typeof Leilao,
    @InjectModel(Lance) private lances: typeof Lance,
  ) {}

  async criar(dados: CriarLeilaoDto) {
    return this.leiloes.create(dados as any);
  }

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
    }
    if (status && (status === "aberto" || status === "encerrado")) {
      where.status = status as Leilao["status"];
    }
    if (usuarioId != null) where.id_usuario = usuarioId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (ganhadorId != null) where.ganhadorId = ganhadorId;

    const offset = (page - 1) * limit;

    const { rows, count } = await this.leiloes.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["id", "ASC"]],
    });

    return {
      data: rows,
      total: count,
      page: Number(page),
      lastPage: Math.ceil(count / limit),
    };
  }

  async visualizar(id: number) {
    return this.leiloes.findOne({
      where: { id },
      include: [{ model: Lance, as: "lances" }],
    });
  }

  async atualizar(id: number, dados: AtualizarLeilaoDto) {
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
  }
}
