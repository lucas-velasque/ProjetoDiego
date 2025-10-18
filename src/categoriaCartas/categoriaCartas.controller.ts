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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("categoria-cartas")
@Controller("categoriaCartas")
export class CategoriaCartasController {
  constructor(private readonly servico: CategoriaCartasService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: "Criar uma nova categoria de carta" })
  @ApiResponse({
    status: 201,
    description: "Categoria de carta criada com sucesso.",
  })
  @ApiResponse({ status: 400, description: "Erro ao criar categoria de carta." })
  @ApiBody({ type: criarCategoriaCartaDto })
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
  @ApiOperation({ summary: "Listar categorias de cartas" })
  @ApiResponse({
    status: 200,
    description: "Lista de categorias de cartas retornada com sucesso.",
  })
  @ApiQuery({
    name: "nome",
    required: false,
    description: "Filtrar categorias por nome",
  })
  @ApiQuery({
    name: "page",
    required: false,
    description: "Número da página para paginação",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Limite de itens por página",
  })
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
  @ApiOperation({ summary: "Buscar uma categoria de carta por ID" })
  @ApiResponse({
    status: 200,
    description: "Categoria de carta encontrada com sucesso.",
  })
  @ApiResponse({
    status: 404,
    description: "Categoria de carta não encontrada.",
  })
  @ApiParam({
    name: "id",
    description: "ID da categoria de carta",
    type: Number,
  })
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
  @ApiOperation({ summary: "Atualizar uma categoria de carta" })
  @ApiResponse({
    status: 200,
    description: "Categoria de carta atualizada com sucesso.",
  })
  @ApiResponse({
    status: 404,
    description: "Categoria de carta não encontrada para atualização.",
  })
  @ApiParam({
    name: "id",
    description: "ID da categoria de carta",
    type: Number,
  })
  @ApiBody({ type: atualizarCategoriaCartaDto })
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
  @ApiOperation({ summary: "Excluir uma categoria de carta" })
  @ApiResponse({
    status: 200,
    description: "Categoria de carta excluída com sucesso.",
  })
  @ApiResponse({
    status: 404,
    description: "Categoria de carta não encontrada para exclusão.",
  })
  @ApiParam({
    name: "id",
    description: "ID da categoria de carta",
    type: Number,
  })
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