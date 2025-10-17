import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { CategoriaCartas } from "./categoriaCartas.model";
import { criarCategoriaCartaDto } from "./dto/criarCategoriaCarta";
import { atualizarCategoriaCartaDto } from "./dto/atualizarCategoriaCarta";

@Injectable()
export class CategoriaCartasService {
  constructor(
    @InjectModel(CategoriaCartas)
    private readonly categoriaCartasModel: typeof CategoriaCartas
  ) {}

  async criar(dados: criarCategoriaCartaDto): Promise<CategoriaCartas> {
    return this.categoriaCartasModel.create(dados as any);
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

    const { rows, count } = await this.categoriaCartasModel.findAndCountAll({
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

  async buscarUm(id: number) {
    return this.categoriaCartasModel.findOne({ where: { id } });
  }

  async atualizar(id: number, dados: atualizarCategoriaCartaDto) {
    return this.categoriaCartasModel.update(dados, { where: { id } });
  }

  async deletar(id: number) {
    return this.categoriaCartasModel.destroy({ where: { id } });
  }
}
