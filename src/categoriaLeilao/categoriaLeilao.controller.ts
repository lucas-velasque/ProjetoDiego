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
import { CategoriaLeilaoService } from "./categoriaLeilao.service";
import { criarCategoriaLeilaoDto } from "./dto/criarCategoriaLeilao";
import { atualizarCategoriaLeilaoDto } from "./dto/atualizarCategoriaLeilao";
import { Public } from "src/common/decorators/public.decorator";

@Controller("CategoriaLeilao")
export class CategoriaLeilaoController {
  constructor(private readonly servico: CategoriaLeilaoService) {}

  @Public()
  @Post()
  async criar(@Body() criarDto: criarCategoriaLeilaoDto) {
    try {
      const categoriaCriada = await this.servico.criar(criarDto);
      return {
        mensagem: "Categoria de leilão criada com sucesso.",
        dados: categoriaCriada,
      };
    } catch (error) {
      throw new BadRequestException("Erro ao criar categoria de leilão.");
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
    const categoria = await this.servico.buscar_um(id);
    if (!categoria) {
      throw new NotFoundException("Categoria de leilão não encontrada.");
    }
    return {
      mensagem: "Categoria de leilão encontrada.",
      dados: categoria,
    };
  }

  @Public()
  @Put(":id")
  async atualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() atualizarDto: atualizarCategoriaLeilaoDto
  ) {
    const categoriaAtualizada = await this.servico.atualizar(id, atualizarDto);
    if (!categoriaAtualizada) {
      throw new NotFoundException(
        "Categoria de leilão não encontrada para atualização."
      );
    }
    return {
      mensagem: "Categoria de leilão atualizada com sucesso.",
      dados: categoriaAtualizada,
    };
  }

  @Public()
  @Delete(":id")
  async deletar(@Param("id", ParseIntPipe) id: number) {
    const resultado = await this.servico.deletar(id);
    if (!resultado) {
      throw new NotFoundException(
        "Categoria de leilão não encontrada para exclusão."
      );
    }
    return { mensagem: "Categoria de leilão excluída com sucesso." };
  }
}
