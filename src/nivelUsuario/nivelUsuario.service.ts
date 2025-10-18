import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { Op } from "sequelize";
import { criarNivelUsuarioDto } from "./dto/criarNivelUsuario";
import { AtualizarNivelUsuarioDto } from "./dto/atualizarNivelUsuario";
import { NivelUsuario } from "./nivelUsuario.model";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/user.model"; // aqui estava com erro de import

@Injectable()
export class NivelUsuarioService {
  constructor(
    @InjectModel(NivelUsuario)
    private readonly nivelUsuarioModel: typeof NivelUsuario,

    @InjectModel(User) // aqui também
    private readonly usuarioModel: typeof User, // aqui também
  ) {}

  private async existeNivelBase(): Promise<boolean> {
    const nivelBase = await this.nivelUsuarioModel.findOne({
      where: { pontuacaoMinima: 0 },
    });
    return !!nivelBase;
  }

  async criar(dados: criarNivelUsuarioDto): Promise<NivelUsuario> {
    if (dados.pontuacaoMinima !== undefined && dados.pontuacaoMinima < 0) {
      throw new BadRequestException(
        "A pontuacao minima não pode ser negativa.",
      );
    }

    const existePontuacao = await this.nivelUsuarioModel.findOne({
      where: { pontuacaoMinima: dados.pontuacaoMinima },
    });
    if (existePontuacao) {
      throw new BadRequestException(
        "Já existe nível com essa pontuação mínima.",
      );
    }

    const novoNivel = await this.nivelUsuarioModel.create(dados as any);

    if (!(await this.existeNivelBase())) {
      throw new BadRequestException(
        "Deve existir um nível base com pontuação mínima 0.",
      );
    }

    return novoNivel;
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
    const nivel = await this.nivelUsuarioModel.findOne({ where: { id } });
    if (!nivel) throw new NotFoundException("Nível não encontrado.");
    return nivel;
  }

  async atualizar(id: number, dados: AtualizarNivelUsuarioDto) {
    const nivelAtual = await this.buscar_um(id);

    if (dados.pontuacaoMinima !== undefined && dados.pontuacaoMinima < 0) {
      throw new BadRequestException(
        "A pontuacao minima não pode ser negativa.",
      );
    }

    if (
      dados.pontuacaoMinima !== undefined &&
      dados.pontuacaoMinima !== nivelAtual.pontuacaoMinima
    ) {
      const existePontuacao = await this.nivelUsuarioModel.findOne({
        where: {
          pontuacaoMinima: dados.pontuacaoMinima,
          id: { [Op.ne]: id },
        },
      });
      if (existePontuacao) {
        throw new BadRequestException(
          "Já existe nível com essa pontuação mínima.",
        );
      }
    }

    await this.nivelUsuarioModel.update(dados, { where: { id } });

    if (!(await this.existeNivelBase())) {
      throw new BadRequestException(
        "Deve existir um nível base com pontuação mínima 0.",
      );
    }

    return this.buscar_um(id);
  }

  async deletar(id: number) {
    const usuariosComNivel = await this.usuarioModel.count({
      where: { nivelUsuarioId: id },
    });
    if (usuariosComNivel > 0) {
      throw new BadRequestException(
        "Nível em uso por usuários, não pode ser deletado.",
      );
    }

    const deleted = await this.nivelUsuarioModel.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException("Nível não encontrado.");
    return deleted;
  }

  async buscarNivelPorPontuacao(pontuacao: number): Promise<NivelUsuario> {
    const nivel = await this.nivelUsuarioModel.findOne({
      where: {
        pontuacaoMinima: { [Op.lte]: pontuacao },
      },
      order: [["pontuacaoMinima", "DESC"]],
    });

    if (!nivel) {
      throw new NotFoundException(
        "Nenhum nível encontrado para a pontuação informada.",
      );
    }

    return nivel;
  }
}
