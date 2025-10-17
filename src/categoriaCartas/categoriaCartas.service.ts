import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
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
    const nomeLower = dados.nome.toLowerCase();

    const palavrasProibidas = ["admin", "root", "null", "vazio", "proibido"];
    if (palavrasProibidas.some((palavra) => nomeLower.includes(palavra))) {
      throw new BadRequestException(
        "O nome da categoria contém palavras não permitidas."
      );
    }

    const categoriaExistente = await this.categoriaCartasModel.findOne({
      where: {
        nome: { [Op.iLike]: dados.nome },
      },
    });

    if (categoriaExistente) {
      throw new BadRequestException("Já existe uma categoria com esse nome.");
    }

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
    const categoria = await this.categoriaCartasModel.findOne({
      where: { id },
    });
    if (!categoria) {
      throw new NotFoundException("Categoria não encontrada.");
    }
    return categoria;
  }

  async atualizar(id: number, dados: atualizarCategoriaCartaDto) {
    const categoria = await this.categoriaCartasModel.findOne({
      where: { id },
    });
    if (!categoria) {
      throw new NotFoundException("Categoria não encontrada.");
    }

    return this.categoriaCartasModel.update(dados, { where: { id } });
  }

  async deletar(id: number) {
    const categoria = await this.categoriaCartasModel.findOne({
      where: { id },
      include: ["cartas"],
    });

    if (!categoria) {
      throw new NotFoundException("Categoria não encontrada.");
    }

    if (categoria.cartas && categoria.cartas.length > 0) {
      throw new BadRequestException(
        "Não é possível deletar uma categoria que está em uso."
      );
    }

    await this.categoriaCartasModel.destroy({ where: { id } });

    return { message: "Categoria deletada com sucesso" };
  }
}
