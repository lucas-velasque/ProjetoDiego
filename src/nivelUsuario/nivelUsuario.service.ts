import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { NivelUsuario } from "./nivelUsuario.model";
import { criarNivelUsuarioDto } from "./dto/criarNivelUsuario";
import { AtualizarNivelUsuarioDto } from "./dto/atualizarNivelUsuario";

@Injectable()
export class NivelUsuarioService {
  constructor(
    @InjectModel(NivelUsuario)
    private readonly nivelUsuarioModel: typeof NivelUsuario
  ) {}

  async criar(dados: criarNivelUsuarioDto): Promise<NivelUsuario> {
    const nomeLower = dados.nome.toLowerCase();

    const palavrasProibidas = ["admin", "root", "null", "vazio", "proibido"];
    if (palavrasProibidas.some((palavra) => nomeLower.includes(palavra))) {
      throw new BadRequestException(
        "O nome do nível contém palavras não permitidas."
      );
    }

    const nivelExistente = await this.nivelUsuarioModel.findOne({
      where: {
        nome: { [Op.iLike]: dados.nome },
      },
    });

    if (nivelExistente) {
      throw new BadRequestException("Já existe um nível com esse nome.");
    }

    return this.nivelUsuarioModel.create(dados as any);
  }

  async listar(filtros: { nome?: string; corIdentificacao?: string; page?: number; limit?: number }) {
    const { nome, corIdentificacao, page = 1, limit = 10 } = filtros;

    const where: any = {};

    if (nome) {
      where.nome = {
        [Op.iLike]: `%${nome}%`,
      };
    }

    if (corIdentificacao) {
      where.corIdentificacao = {
        [Op.iLike]: `%${corIdentificacao}%`,
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
    const nivel = await this.nivelUsuarioModel.findOne({
      where: { id },
    });
    if (!nivel) {
      throw new NotFoundException("Nível de usuário não encontrado.");
    }
    return nivel;
  }

  async atualizar(id: number, dados: AtualizarNivelUsuarioDto) {
    const nivel = await this.nivelUsuarioModel.findOne({
      where: { id },
    });
    if (!nivel) {
      throw new NotFoundException("Nível de usuário não encontrado.");
    }

    await this.nivelUsuarioModel.update(dados, { where: { id } });
    const nivelAtualizado = await this.nivelUsuarioModel.findOne({ where: { id } });

    return nivelAtualizado;
  }

  async deletar(id: number) {
    const nivel = await this.nivelUsuarioModel.findOne({
      where: { id },
    });

    if (!nivel) {
      throw new NotFoundException("Nível de usuário não encontrado.");
    }

    await this.nivelUsuarioModel.destroy({ where: { id } });

    return true;
  }
}
