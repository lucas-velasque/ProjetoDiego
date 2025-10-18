import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { AnunciosVendaService } from './anuncioVenda.service';
import { CreateAnuncioVendaDto } from './dto/createAnuncioVenda.dto';
import { UpdateAnuncioVendaDto } from './dto/updateAnuncioVenda.dto';
import { Public } from '../common/decorators/public.decorator';
import { FiltroAnuncioVendaDto } from './dto/filtroAnuncioVenda.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('anúncios-venda')
@ApiBearerAuth()
@Controller('anuncios-venda')
export class AnunciosVendaController {
  constructor(private readonly service: AnunciosVendaService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Criar um novo anúncio de venda' })
  @ApiResponse({ status: 201, description: 'Anúncio criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  criar(@Body() dto: CreateAnuncioVendaDto, @Request() req) {
    const usuarioId = 1; // TODO: token JWT
    return this.service.criar(dto, usuarioId);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar todos os anúncios de venda com filtros' })
  @ApiResponse({ status: 200, description: 'Lista de anúncios retornada com sucesso' })
  @ApiQuery({ name: 'preco_min', required: false, type: Number, description: 'Preço mínimo' })
  @ApiQuery({ name: 'preco_max', required: false, type: Number, description: 'Preço máximo' })
  @ApiQuery({ name: 'nome_carta', required: false, type: String, description: 'Nome da carta' })
  @ApiQuery({ name: 'condicao', required: false, type: String, description: 'Condição da carta' })
  @ApiQuery({ name: 'raridade', required: false, type: String, description: 'Raridade da carta' })
  @ApiQuery({ name: 'status', required: false, enum: ['ativo', 'vendido', 'cancelado'], description: 'Status do anúncio' })
  @ApiQuery({ name: 'data_inicio', required: false, type: String, description: 'Data de início (YYYY-MM-DD)' })
  @ApiQuery({ name: 'data_fim', required: false, type: String, description: 'Data de fim (YYYY-MM-DD)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limite por página' })
  listarTodos(@Query() filtros: FiltroAnuncioVendaDto) {
    return this.service.listarTodos(filtros);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Buscar anúncio de venda por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do anúncio' })
  @ApiResponse({ status: 200, description: 'Anúncio encontrado' })
  @ApiResponse({ status: 404, description: 'Anúncio não encontrado' })
  buscarPorId(@Param('id') id: string) {
    return this.service.buscarPorId(+id);
  }

  @Public()
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um anúncio de venda' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do anúncio' })
  @ApiResponse({ status: 200, description: 'Anúncio atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Anúncio não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  atualizar(@Param('id') id: string, @Body() dto: UpdateAnuncioVendaDto) {
    return this.service.atualizar(+id, dto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um anúncio de venda' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do anúncio' })
  @ApiResponse({ status: 200, description: 'Anúncio deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Anúncio não encontrado' })
  deletar(@Param('id') id: string) {
    return this.service.deletar(+id);
  }
}