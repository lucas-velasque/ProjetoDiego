import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { AdicionarCarrinhoDto } from './dto/adicionarCarrinho.dto';
import { FiltroPedidoDto } from './dto/filtroPedido.dto';
import { Public } from '../common/decorators/public.decorator';
import { UsuarioAtual } from '../common/decorators/usuarioAtual.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('carrinho')
@ApiBearerAuth()
@Controller()
export class CarrinhoController {
  constructor(private readonly service: CarrinhoService) {}

  // 1. ADICIONAR AO CARRINHO
  // Adicionei informações sobre o endpoint para o swagger
  @Post('carrinho')
  @ApiOperation({
    summary: 'Adicionar item ao carrinho',
    description: 'Adiciona um anúncio de venda ao carrinho de compras do usuário autenticado'
  })
  @ApiBody({ type: AdicionarCarrinhoDto })
  @ApiResponse({ status: 201, description: 'Item adicionado ao carrinho com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Anúncio não encontrado' })
  adicionarAoCarrinho(@Body() dto: AdicionarCarrinhoDto, @UsuarioAtual() usuario) {
    // Extrai o ID do usuário autenticado do token JWT
    const usuarioId = usuario.sub;
    return this.service.adicionarAoCarrinho(dto, usuarioId);
  }

  // 2. REMOVER DO CARRINHO
  // Adicionei informações sobre o endpoint para o swagger
  @Delete('carrinho/:itemId')
  @ApiOperation({
    summary: 'Remover item do carrinho',
    description: 'Remove um item específico do carrinho de compras do usuário autenticado'
  })
  @ApiParam({ name: 'itemId', type: Number, description: 'ID do item no carrinho', example: 1 })
  @ApiResponse({ status: 200, description: 'Item removido do carrinho com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Item não encontrado no carrinho' })
  removerDoCarrinho(@Param('itemId') itemId: string, @UsuarioAtual() usuario) {
    // Extrai o ID do usuário autenticado do token JWT
    const usuarioId = usuario.sub;
    return this.service.removerDoCarrinho(+itemId, usuarioId);
  }

  // 3. VER CARRINHO
  // Adicionei informações sobre o endpoint para o swagger
  @Get('carrinho')
  @ApiOperation({
    summary: 'Visualizar carrinho',
    description: 'Retorna todos os itens no carrinho de compras do usuário autenticado'
  })
  @ApiResponse({ status: 200, description: 'Carrinho retornado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  verCarrinho(@UsuarioAtual() usuario) {
    // Extrai o ID do usuário autenticado do token JWT
    const usuarioId = usuario.sub;
    return this.service.verCarrinho(usuarioId);
  }

  // 4. CHECKOUT (FINALIZAR COMPRA)
  // Adicionei informações sobre o endpoint para o swagger
  @Post('carrinho/checkout')
  @ApiOperation({
    summary: 'Finalizar compra',
    description: 'Finaliza a compra convertendo os itens do carrinho em um pedido'
  })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Carrinho vazio ou erro ao processar pedido' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  checkout(@UsuarioAtual() usuario) {
    // Extrai o ID do usuário autenticado do token JWT
    const usuarioId = usuario.sub;
    return this.service.checkout(usuarioId);
  }

  // 5. LISTAR PEDIDOS
  // Adicionei informações sobre o endpoint para o swagger
  @Get('pedidos')
  @ApiOperation({
    summary: 'Listar pedidos do usuário',
    description: 'Retorna todos os pedidos do usuário autenticado com filtros opcionais'
  })
  @ApiQuery({ name: 'status', required: false, enum: ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado'], description: 'Filtrar por status do pedido' })
  @ApiQuery({ name: 'data_inicio', required: false, type: String, description: 'Data de início (YYYY-MM-DD)' })
  @ApiQuery({ name: 'data_fim', required: false, type: String, description: 'Data de fim (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos retornada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  listarPedidos(@Query() filtros: FiltroPedidoDto, @UsuarioAtual() usuario) {
    // Extrai o ID do usuário autenticado do token JWT
    const usuarioId = usuario.sub;
    return this.service.listarPedidos(usuarioId, filtros);
  }

  // 6. DETALHAR PEDIDO
  // Adicionei informações sobre o endpoint para o swagger
  @Get('pedidos/:id')
  @ApiOperation({
    summary: 'Detalhar pedido específico',
    description: 'Retorna os detalhes completos de um pedido específico do usuário autenticado'
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID do pedido', example: 1 })
  @ApiResponse({ status: 200, description: 'Detalhes do pedido retornados com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  detalharPedido(@Param('id') id: string, @UsuarioAtual() usuario) {
    // Extrai o ID do usuário autenticado do token JWT
    const usuarioId = usuario.sub;
    return this.service.detalharPedido(+id, usuarioId);
  }

  // 7. CANCELAR PEDIDO
  // Adicionei informações sobre o endpoint para o swagger
  @Post('pedidos/:id/cancelar')
  @ApiOperation({
    summary: 'Cancelar pedido',
    description: 'Cancela um pedido específico do usuário autenticado'
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID do pedido a ser cancelado', example: 1 })
  @ApiResponse({ status: 200, description: 'Pedido cancelado com sucesso' })
  @ApiResponse({ status: 400, description: 'Pedido não pode ser cancelado (já foi enviado/entregue)' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  cancelarPedido(@Param('id') id: string, @UsuarioAtual() usuario) {
    // Extrai o ID do usuário autenticado do token JWT
    const usuarioId = usuario.sub;
    return this.service.cancelarPedido(+id, usuarioId);
  }
}