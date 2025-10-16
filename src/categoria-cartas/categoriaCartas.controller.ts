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
import { CategoriaCartasService } from "./categoriaCartas.service";
import { criarCategoriaCartaDto } from "./dto/criarCategoriaCarta";
import { atualizarCategoriaCartaDto } from "./dto/atualizarCategoriaCarta";
import { Public } from "src/common/decorators/public.decorator";

@Controller("categoriaCartas")
export class CategoriaCartasController {
  constructor(private readonly servico: CategoriaCartasService) {}

  @Public()
  @Post()
  async criar(@Body() dadosCriacao: criarCategoriaCartaDto) {
    try {
      const categoriaCriada = await this.servico.criar(dadosCriacao);
      return {
        mensagem: "Categoria de carta criada com sucesso.",
        dados: categoriaCriada,
      };
    } catch (error) {
      throw new BadRequestException("Erro ao criar categoria de carta.");
    }
  }

  @Public()
  @Get()
  async listar(
    @Query("nome") nome?: string,
    @Query("page") pagina?: string,
    @Query("limit") limite?: string
  ) {
    const filtros = {
      nome,
      page: pagina ? parseInt(pagina, 10) : undefined,
      limit: limite ? parseInt(limite, 10) : undefined,
    };
    return await this.servico.listar(filtros);
  }

  @Public()
  @Get(":id")
  async buscarUm(@Param("id", ParseIntPipe) id: number) {
    const categoria = await this.servico.buscarUm(id);
    if (!categoria) {
      throw new NotFoundException("Categoria de carta não encontrada.");
    }
    return {
      mensagem: "Categoria de carta encontrada.",
      dados: categoria,
    };
  }

  @Public()
  @Put(":id")
  async atualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dadosAtualizacao: atualizarCategoriaCartaDto
  ) {
    const categoriaAtualizada = await this.servico.atualizar(
      id,
      dadosAtualizacao
    );

    if (!categoriaAtualizada) {
      throw new NotFoundException(
        "Categoria de carta não encontrada para atualização."
      );
    }

    return {
      mensagem: "Categoria de carta atualizada com sucesso.",
      dados: dadosAtualizacao,
    };
  }

  @Public()
  @Delete(":id")
  async deletar(@Param("id", ParseIntPipe) id: number) {
    const resultado = await this.servico.deletar(id);

    if (!resultado) {
      throw new NotFoundException(
        "Categoria de carta não encontrada para exclusão."
      );
    }

    return { mensagem: "Categoria de carta excluída com sucesso." };
  }
}
