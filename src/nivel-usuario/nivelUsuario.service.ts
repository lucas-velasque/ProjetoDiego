import { Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { criarNivelUsuarioDto } from "./dto/criarNivelUsuario";
import { atualizarNivelUsuarioDto } from "./dto/atualizarNivelUsuario";
import { NivelUsuario } from "./nivelUsuario.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class NivelUsuarioService {
  constructor(
    @InjectModel(NivelUsuario)
    private readonly nivelUsuarioModel: typeof NivelUsuario
  ) {}

  async criar(dados: criarNivelUsuarioDto): Promise<NivelUsuario> {
    return this.nivelUsuarioModel.create(dados as any);
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

    const { rows, count } = await this.nivelUsuarioModel.findAndCountAll({
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
    return this.nivelUsuarioModel.findOne({ where: { id } });
  }

  async atualizar(id: number, dados: atualizarNivelUsuarioDto) {
    return this.nivelUsuarioModel.update(dados, { where: { id } });
  }

  async deletar(id: number) {
    const deleted = await this.nivelUsuarioModel.destroy({ where: { id } });
    return deleted;
  }
}
