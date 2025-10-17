import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { criarCategoriaLeilaoDto } from "./dto/criarCategoriaLeilao";
import { atualizarCategoriaLeilaoDto } from "./dto/atualizarCategoriaLeilao";
import { CategoriaLeilao } from "./categoriaLeilao.model";
//erro de nome de import aqui
import { Leilao } from "src/leiloes/entities/leilao.model";

@Injectable()
export class CategoriaLeilaoService {
  constructor(
    @InjectModel(CategoriaLeilao)
    private readonly categoriaLeilaoModel: typeof CategoriaLeilao,
    @InjectModel(Leilao)
    private readonly leilaoModel: typeof Leilao
  ) {}

  async criar(dados: criarCategoriaLeilaoDto): Promise<CategoriaLeilao> {
    const existente = await this.categoriaLeilaoModel.findOne({
      where: { nome: dados.nome },
    });

    if (existente) {
      throw new BadRequestException(
        "Já existe uma categoria de leilão com esse nome."
      );
    }

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
    const categoria = await this.categoriaLeilaoModel.findOne({
      where: { id },
    });
    if (!categoria) {
      throw new NotFoundException("Categoria de leilão não encontrada.");
    }

    if (dados.nome) {
      const existente = await this.categoriaLeilaoModel.findOne({
        where: {
          nome: dados.nome,
          id: { [Op.ne]: id },
        },
      });
      if (existente) {
        throw new BadRequestException("Já existe uma categoria com esse nome.");
      }
    }

    if (dados.tipo && dados.tipo !== categoria.tipo) {
      const usados = await this.leilaoModel.count({
        where: { categoriaLeilaoId: id, ativo: true },
      });

      if (usados > 0) {
        throw new BadRequestException(
          "Não é possível alterar o tipo de uma categoria em uso."
        );
      }
    }

    if (dados.status === "inativo" && categoria.status !== "inativo") { //aqui tava com problema de tipo, precisei alterar
      const usados = await this.leilaoModel.count({
        where: { categoriaLeilaoId: id, ativo: true },
      });

      if (usados > 0) {
        throw new BadRequestException(
          "Não é possível desativar uma categoria em uso."
        );
      }
    }

    await this.categoriaLeilaoModel.update(dados, { where: { id } });

    return this.buscar_um(id);
  }

  async deletar(id: number) {
    const categoria = await this.categoriaLeilaoModel.findByPk(id);
    if (!categoria) {
      throw new NotFoundException("Categoria de leilão não encontrada.");
    }

    // Corrigido: Leilao usa 'ativo' (boolean), não 'status' (string)
    // Corrigido: count() retorna number, não array
    const usados = await this.leilaoModel.count({
      where: { categoriaLeilaoId: id, ativo: true },
    });

    if (usados > 0) {
      throw new BadRequestException(
        "Não é possível deletar uma categoria em uso."
      );
    }

    await this.categoriaLeilaoModel.destroy({ where: { id } });

    return { message: "Categoria deletada com sucesso." };
  }
}
