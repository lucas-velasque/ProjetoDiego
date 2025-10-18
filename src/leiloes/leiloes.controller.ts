import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
} from "@nestjs/common";
import { LeiloesService } from "./leiloes.service";
import { CriarLeilaoDto } from "./dto/criar-leilao.dto";
import { AtualizarLeilaoDto } from "./dto/atualizar-leilao.dto";
import { Public } from "src/common/decorators/public.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags('leilões')
@ApiBearerAuth()
@Controller("leiloes")
export class LeiloesController {
  constructor(private readonly service: LeiloesService) {}

  @Public()
  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo leilão de carta Pokémon',
    description: 'Cria um novo leilão para uma carta Pokémon com todas as informações necessárias'
  })
  @ApiBody({ type: CriarLeilaoDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Leilão criado com sucesso',
    schema: {
      example: {
        message: "Leilão criado com sucesso.",
        data: {
          id: 1,
          titulo: "Charizard Raro",
          descricao: "Charizard primeira edição em perfeito estado",
          precoInicial: 1000,
          categoria: "Rara",
          status: "ativo",
          data_fim: "2024-12-31T23:59:59Z",
          id_usuario_criar: 1,
          valor_inicial: 1000,
          valor_atual: 1000,
          valor_incremento: 50
        }
      }
    }
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async criar(@Body() dto: CriarLeilaoDto) {
    try {
      const data = await this.service.criar(dto);
      return { message: "Leilão criado com sucesso.", data };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao criar leilão.");
    }
  }

  @Public()
  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os leilões de cartas Pokémon',
    description: 'Retorna uma lista paginada de leilões de cartas Pokémon, com opção de filtro por título'
  })
  @ApiQuery({
    name: 'titulo',
    required: false,
    description: 'Filtrar leilões por título',
    example: 'Charizard'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Quantidade de itens por página',
    example: 10
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Leilões listados com sucesso',
    schema: {
      example: {
        message: "Leilões listados com sucesso.",
        data: [
          {
            id: 1,
            titulo: "Charizard Raro",
            descricao: "Charizard primeira edição",
            precoInicial: 1000,
            categoria: "Rara",
            status: "ativo",
            data_fim: "2024-12-31T23:59:59Z",
            valor_atual: 1500,
            lance_atual: 1500
          }
        ],
        meta: { 
          total: 15, 
          page: 1, 
          lastPage: 2 
        }
      }
    }
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async listar(
    @Query()
    query: {
      titulo?: string;
      page?: number;
      limit?: number;
    },
  ) {
    try {
      const { data, total, page, lastPage } = await this.service.listar(query);
      return {
        message: "Leilões listados com sucesso.",
        data,
        meta: { total, page, lastPage },
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao listar leilões.");
    }
  }

  @Public()
  @Get(":id")
  @ApiOperation({ 
    summary: 'Visualizar um leilão específico',
    description: 'Retorna os detalhes completos de um leilão de carta Pokémon específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID do leilão',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Leilão recuperado com sucesso',
    schema: {
      example: {
        message: "Leilão recuperado com sucesso.",
        data: {
          id: 1,
          titulo: "Charizard Raro",
          descricao: "Charizard primeira edição em perfeito estado",
          precoInicial: 1000,
          categoria: "Rara",
          status: "ativo",
          data_fim: "2024-12-31T23:59:59Z",
          id_usuario_criar: 1,
          valor_inicial: 1000,
          valor_atual: 1500,
          valor_incremento: 50,
          lances: [
            {
              id: 1,
              valor: 1200,
              data: "2024-01-15T10:30:00Z",
              usuario: { nome: "Treinador Pokémon" }
            }
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Leilão não encontrado' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async visualizar(@Param("id", ParseIntPipe) id: number) {
    try {
      const data = await this.service.visualizar(id);
      if (!data) throw new NotFoundException("Leilão não encontrado.");
      return { message: "Leilão recuperado com sucesso.", data };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao buscar leilão.");
    }
  }

  @Public()
  @Patch(":id")
  @ApiOperation({ 
    summary: 'Atualizar um leilão',
    description: 'Atualiza informações parciais de um leilão de carta Pokémon existente'
  })
  @ApiParam({
    name: 'id',
    description: 'ID do leilão a ser atualizado',
    example: 1
  })
  @ApiBody({ type: AtualizarLeilaoDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Leilão atualizado com sucesso',
    schema: {
      example: {
        message: "Leilão atualizado com sucesso.",
        data: {
          id: 1,
          titulo: "Charizard Raro - Edição Especial",
          descricao: "Charizard primeira edição em perfeito estado",
          precoInicial: 1200,
          categoria: "Rara",
          status: "ativo",
          data_fim: "2024-12-31T23:59:59Z",
          valor_inicial: 1200,
          valor_atual: 1500,
          valor_incremento: 75
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Leilão não encontrado para atualização' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async atualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: AtualizarLeilaoDto,
  ) {
    try {
      const result = await this.service.atualizar(id, dto);
      const affected = Array.isArray(result)
        ? result[0]
        : typeof result === "number"
          ? result
          : 0;

      if (!affected)
        throw new NotFoundException("Leilão não encontrado para atualização.");

      const data = await this.service.visualizar(id);
      return { message: "Leilão atualizado com sucesso.", data };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao atualizar leilão.");
    }
  }

  @Public()
  @Delete(":id")
  @ApiOperation({ 
    summary: 'Excluir um leilão',
    description: 'Remove permanentemente um leilão de carta Pokémon do sistema'
  })
  @ApiParam({
    name: 'id',
    description: 'ID do leilão a ser excluído',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Leilão removido com sucesso',
    schema: {
      example: {
        message: "Leilão removido com sucesso."
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Leilão não encontrado para exclusão' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async deletar(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.service.deletar(id);
      if (!deleted)
        throw new NotFoundException("Leilão não encontrado para exclusão.");
      return { message: "Leilão removido com sucesso." };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao remover leilão.");
    }
  }
}