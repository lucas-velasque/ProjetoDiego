import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Query,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { NivelUsuarioService } from "./nivelUsuario.service";
import { criarNivelUsuarioDto } from "./dto/criarNivelUsuario";
import { atualizarNivelUsuarioDto } from "./dto/atualizarNivelUsuario";
import { Public } from "src/common/decorators/public.decorator";

@Controller("NivelUsuario")
export class NivelUsuarioController {
  constructor(private readonly servico: NivelUsuarioService) {}

  @Public()
  @Post()
  async criar(@Body() criarDto: criarNivelUsuarioDto) {
    try {
      const nivelCriado = await this.servico.criar(criarDto);
      return {
        mensagem: "Nível de usuário criado com sucesso.",
        dados: nivelCriado,
      };
    } catch (error) {
      throw new BadRequestException("Erro ao criar nível de usuário.");
    }
  }

  @Public()
  @Get()
  async listar(
    @Query("nome") nome?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    const filtros = {
      nome,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    };
    return await this.servico.listar(filtros);
  }

  @Public()
  @Get(":id")
  async buscarUm(@Param("id", ParseIntPipe) id: number) {
    const nivel = await this.servico.buscar_um(id);
    if (!nivel) {
      throw new NotFoundException("Nível de usuário não encontrado.");
    }
    return {
      mensagem: "Nível de usuário encontrado.",
      dados: nivel,
    };
  }

  @Public()
  @Put(":id")
  async atualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() atualizarDto: atualizarNivelUsuarioDto
  ) {
    const nivelAtualizado = await this.servico.atualizar(id, atualizarDto);
    if (!nivelAtualizado) {
      throw new NotFoundException(
        "Nível de usuário não encontrado para atualização."
      );
    }
    return {
      mensagem: "Nível de usuário atualizado com sucesso.",
      dados: nivelAtualizado,
    };
  }

  @Public()
  @Delete(":id")
  async deletar(@Param("id", ParseIntPipe) id: number) {
    const resultado = await this.servico.deletar(id);
    if (!resultado) {
      throw new NotFoundException(
        "Nível de usuário não encontrado para exclusão."
      );
    }
    return { mensagem: "Nível de usuário excluído com sucesso." };
  }
}
