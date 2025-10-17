import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Leilao } from "./entities/leilao.model";
import { Lance } from "./entities/lance.model";
import { Op } from "sequelize";
import { CriarLeilaoDto } from "./dto/criar-leilao.dto";
import { AtualizarLeilaoDto } from "./dto/atualizar-leilao.dto";

@Injectable()
export class LeiloesService {
  constructor(
    @InjectModel(Leilao) private leiloes: typeof Leilao,
    @InjectModel(Lance) private lances: typeof Lance,
  ) {}

  async criar(dados: CriarLeilaoDto) {
    return this.leiloes.create(dados as any);
  }

  async listar(filtros: { titulo?: string; page?: number; limit?: number }) {
    const { titulo, page = 1, limit = 10 } = filtros;

    const where: any = {};

    if (titulo) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.titulo = {
        [Op.iLike]: "%${titulo}%",
      };
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await this.leiloes.findAndCountAll({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    return {
      data: rows,
      total: count,
      page,
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
    return this.leiloes.update(dados, { where: { id } });
  }

  async deletar(id: number) {
    const deletarleilao = this.leiloes.destroy({ where: { id } });
    return deletarleilao;
  }
}
