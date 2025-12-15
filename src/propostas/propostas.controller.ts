import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { PropostasService } from './propostas.service';
import { CreatePropostaDto } from './dto/createProposta.dto';
import { UpdatePropostaDto } from './dto/updateProposta.dto';
import { Public } from '../common/decorators/public.decorator';
import { UsuarioAtual } from '../common/decorators/usuarioAtual.decorator';
import { FiltroPropostaDto } from './dto/filtroPropostas.dto';
import { Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('propostas')
@Controller()
export class PropostasController {
  constructor(private readonly service: PropostasService) {}

  @Post('anuncios/:tipo/:id/propostas')
  @ApiOperation({ summary: 'Criar uma nova proposta para um anúncio' })
  @ApiParam({ name: 'tipo', description: 'Tipo do anúncio', example: 'venda' })
  @ApiParam({ name: 'id', description: 'ID do anúncio', example: 1 })
  @ApiBody({ type: CreatePropostaDto })
  @ApiResponse({ status: 201, description: 'Proposta criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Anúncio não encontrado' })
  criar(
    @Param('tipo') tipo: string,
    @Param('id') anuncioId: string,
    @Body() dto: CreatePropostaDto,
    @UsuarioAtual() usuario,
  ) {
    // Extrai o ID do usuário autenticado do token JWT
    const usuarioId = usuario.sub;
    return this.service.criar(dto, tipo, +anuncioId, usuarioId);
  }

  @Public()
  @Get('anuncios/:tipo/:id/propostas')
  @ApiOperation({ summary: 'Listar propostas de um anúncio com filtros' })
  @ApiParam({ name: 'tipo', description: 'Tipo do anúncio', example: 'venda' })
  @ApiParam({ name: 'id', description: 'ID do anúncio', example: 1 })
  @ApiQuery({ name: 'valor_min', required: false, type: Number, description: 'Valor mínimo da proposta' })
  @ApiQuery({ name: 'valor_max', required: false, type: Number, description: 'Valor máximo da proposta' })
  @ApiQuery({ name: 'status', required: false, enum: ['pendente', 'aceita', 'recusada', 'cancelada'], description: 'Status da proposta' })
  @ApiQuery({ name: 'pagina', required: false, type: Number, description: 'Número da página', example: 1 })
  @ApiQuery({ name: 'limite', required: false, type: Number, description: 'Limite de itens por página', example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de propostas retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Anúncio não encontrado' })
  listarPorAnuncio(
    @Param('tipo') tipo: string,
    @Param('id') anuncioId: string,
    @Query() filtros: FiltroPropostaDto,
  ) {
    return this.service.listarPorAnuncio(tipo, +anuncioId, filtros);
  }

  @Public()
  @Patch('propostas/:id/aceitar')
  @ApiOperation({ summary: 'Aceitar uma proposta' })
  @ApiParam({ name: 'id', description: 'ID da proposta', example: 1 })
  @ApiResponse({ status: 200, description: 'Proposta aceita com sucesso' })
  @ApiResponse({ status: 404, description: 'Proposta não encontrada' })
  @ApiResponse({ status: 400, description: 'Proposta não pode ser aceita' })
  aceitar(@Param('id') id: string) {
    return this.service.aceitar(+id);
  }

  @Public()
  @Patch('propostas/:id/recusar')
  @ApiOperation({ summary: 'Recusar uma proposta' })
  @ApiParam({ name: 'id', description: 'ID da proposta', example: 1 })
  @ApiResponse({ status: 200, description: 'Proposta recusada com sucesso' })
  @ApiResponse({ status: 404, description: 'Proposta não encontrada' })
  @ApiResponse({ status: 400, description: 'Proposta não pode ser recusada' })
  recusar(@Param('id') id: string) {
    return this.service.recusar(+id);
  }

  @Public()
  @Get('propostas/anuncio/:anuncioId')
  @ApiOperation({ summary: 'Listar propostas de um anúncio (rota simplificada)' })
  @ApiParam({ name: 'anuncioId', description: 'ID do anúncio', example: 1 })
  @ApiQuery({ name: 'valor_min', required: false, type: Number, description: 'Valor mínimo da proposta' })
  @ApiQuery({ name: 'valor_max', required: false, type: Number, description: 'Valor máximo da proposta' })
  @ApiQuery({ name: 'status', required: false, enum: ['pendente', 'aceita', 'recusada', 'cancelada'], description: 'Status da proposta' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número da página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limite de itens por página', example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de propostas retornada com sucesso' })
  listarPorAnuncioSimplificado(@Param('anuncioId') anuncioId: string, @Query() filtros: FiltroPropostaDto) {
    // Assume tipo 'venda' por padrão (você pode adicionar lógica para detectar o tipo se necessário)
    return this.service.listarPorAnuncio('venda', +anuncioId, filtros);
  }

  @Public()
  @Get('propostas/:id')
  @ApiOperation({ summary: 'Buscar proposta por ID' })
  @ApiParam({ name: 'id', description: 'ID da proposta', example: 1 })
  @ApiResponse({ status: 200, description: 'Proposta encontrada' })
  @ApiResponse({ status: 404, description: 'Proposta não encontrada' })
  buscarPorId(@Param('id') id: string) {
    return this.service.buscarPorId(+id);
  }

  @Public()
  @Patch('propostas/:id')
  @ApiOperation({ summary: 'Atualizar uma proposta' })
  @ApiParam({ name: 'id', description: 'ID da proposta', example: 1 })
  @ApiBody({ type: UpdatePropostaDto })
  @ApiResponse({ status: 200, description: 'Proposta atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Proposta não encontrada' })
  atualizar(@Param('id') id: string, @Body() dto: UpdatePropostaDto) {
    return this.service.atualizar(+id, dto);
  }

  @Public()
  @Delete('propostas/:id')
  @ApiOperation({ summary: 'Deletar uma proposta' })
  @ApiParam({ name: 'id', description: 'ID da proposta', example: 1 })
  @ApiResponse({ status: 200, description: 'Proposta deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Proposta não encontrada' })
  deletar(@Param('id') id: string) {
    return this.service.deletar(+id);
  }
}