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
  UseGuards,
} from "@nestjs/common";
import { CategoriaLeilaoService } from "./categoriaLeilao.service";
import { criarCategoriaLeilaoDto } from "./dto/criarCategoriaLeilao";
import { atualizarCategoriaLeilaoDto } from "./dto/atualizarCategoriaLeilao";
import { RolesGuard } from "./../common/guards/roles.guard";
import { Roles } from "./../common/decorators/roles.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Categoria Leilão - Pokémon")
@ApiBearerAuth()
@Controller("CategoriaLeilao")
@UseGuards(RolesGuard)
export class CategoriaLeilaoController {
  constructor(private readonly servico: CategoriaLeilaoService) {}

  @Post()
  @Roles("admin")
  @ApiOperation({
    summary: "Criar uma nova categoria de leilão",
    description: "Cria uma nova categoria para leilões de cartas Pokémon",
  })
  @ApiBody({ type: criarCategoriaLeilaoDto })
  @ApiResponse({
    status: 201,
    description: "Categoria criada com sucesso",
    schema: {
      example: {
        mensagem: "Categoria de leilão criada com sucesso.",
        dados: {
          id: 1,
          nome: "Cartas Raras",
          descricao: "Categoria para cartas raras de Pokémon",
          tipo: "RARA",
          status: "ATIVA",
          createdAt: "2024-01-15T10:30:00.000Z",
          updatedAt: "2024-01-15T10:30:00.000Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Erro na requisição",
    schema: {
      example: {
        statusCode: 400,
        message: "Erro ao criar categoria de leilão.",
        error: "Bad Request",
      },
    },
  })
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

  @Get()
  @Roles("admin", "user")
  @ApiOperation({
    summary: "Listar categorias de leilão",
    description:
      "Retorna uma lista paginada de categorias de leilão com opção de filtro por nome e tipo",
  })
  @ApiQuery({
    name: "nome",
    required: false,
    description: "Filtrar categorias por nome",
    example: "Raras",
  })
  @ApiQuery({
    name: "tipo",
    required: false,
    description: "Filtrar categorias por tipo",
    example: "RARA",
  })
  @ApiQuery({
    name: "page",
    required: false,
    description: "Número da página para paginação",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Limite de itens por página",
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: "Lista de categorias retornada com sucesso",
    schema: {
      example: {
        data: [
          {
            id: 1,
            nome: "Cartas Raras",
            descricao: "Categoria para cartas raras de Pokémon",
            tipo: "RARA",
            status: "ATIVA",
            createdAt: "2024-01-15T10:30:00.000Z",
            updatedAt: "2024-01-15T10:30:00.000Z",
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    },
  })
  async listar(
    @Query("nome") nome?: string,
    @Query("tipo") tipo?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    const filtros = {
      nome,
      tipo,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    };
    return await this.servico.listar(filtros);
  }

  @Get(":id")
  @Roles("admin", "user")
  @ApiOperation({
    summary: "Buscar categoria por ID",
    description: "Retorna os detalhes de uma categoria de leilão específica",
  })
  @ApiParam({
    name: "id",
    description: "ID da categoria de leilão",
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: "Categoria encontrada com sucesso",
    schema: {
      example: {
        mensagem: "Categoria de leilão encontrada.",
        dados: {
          id: 1,
          nome: "Cartas Raras",
          descricao: "Categoria para cartas raras de Pokémon",
          tipo: "RARA",
          status: "ATIVA",
          createdAt: "2024-01-15T10:30:00.000Z",
          updatedAt: "2024-01-15T10:30:00.000Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Categoria não encontrada",
    schema: {
      example: {
        statusCode: 404,
        message: "Categoria de leilão não encontrada.",
        error: "Not Found",
      },
    },
  })
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

  @Put(":id")
  @Roles("admin")
  @ApiOperation({
    summary: "Atualizar categoria de leilão",
    description: "Atualiza os dados de uma categoria de leilão existente",
  })
  @ApiParam({
    name: "id",
    description: "ID da categoria de leilão a ser atualizada",
    example: 1,
    type: Number,
  })
  @ApiBody({ type: atualizarCategoriaLeilaoDto })
  @ApiResponse({
    status: 200,
    description: "Categoria atualizada com sucesso",
    schema: {
      example: {
        mensagem: "Categoria de leilão atualizada com sucesso.",
        dados: {
          id: 1,
          nome: "Cartas Super Raras",
          descricao: "Categoria para cartas super raras de Pokémon",
          tipo: "LENDARIA",
          status: "ATIVA",
          createdAt: "2024-01-15T10:30:00.000Z",
          updatedAt: "2024-01-15T11:30:00.000Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Categoria não encontrada para atualização",
    schema: {
      example: {
        statusCode: 404,
        message: "Categoria de leilão não encontrada para atualização.",
        error: "Not Found",
      },
    },
  })
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

  @Delete(":id")
  @Roles("admin")
  @ApiOperation({
    summary: "Excluir categoria de leilão",
    description: "Remove uma categoria de leilão do sistema",
  })
  @ApiParam({
    name: "id",
    description: "ID da categoria de leilão a ser excluída",
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: "Categoria excluída com sucesso",
    schema: {
      example: {
        mensagem: "Categoria de leilão excluída com sucesso.",
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Categoria não encontrada para exclusão",
    schema: {
      example: {
        statusCode: 404,
        message: "Categoria de leilão não encontrada para exclusão.",
        error: "Not Found",
      },
    },
  })
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
