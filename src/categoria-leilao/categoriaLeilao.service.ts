import { Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { criarCategoriaLeilaoDto } from "./dto/criarCategoriaLeilao";
import { atualizarCategoriaLeilaoDto } from "./dto/atualizarCategoriaLeilao";
import { CategoriaLeilao } from "./categoriaLeilao.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CategoriaLeilaoService {
  constructor(
    @InjectModel(CategoriaLeilao)
    private readonly categoriaLeilaoModel: typeof CategoriaLeilao
  ) {}

  async criar(dados: criarCategoriaLeilaoDto): Promise<CategoriaLeilao> {
    return this.categoriaLeilaoModel.create(dados as any);
  }

  async listar(filtros: { nome?: string; page?: number; limit?: number }) {
    const { nome, page = 1, limit = 10 } = filtros;

    const where: any = {};

    if (nome) {
      where.nome = {
        [Op.iLike]: `%${nome}%`,
      };
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await this.categoriaLeilaoModel.findAndCountAll({
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

  async buscar_um(id: number) {
    return this.categoriaLeilaoModel.findOne({ where: { id } });
  }

  async atualizar(id: number, dados: atualizarCategoriaLeilaoDto) {
    return this.categoriaLeilaoModel.update(dados, { where: { id } });
  }

  async deletar(id: number) {
    const deleted = await this.categoriaLeilaoModel.destroy({ where: { id } });
    return deleted;
  }
}
