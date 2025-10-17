import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { AdicionarCarrinhoDto } from './dto/adicionarCarrinho.dto';
import { FiltroPedidoDto } from './dto/filtroPedido.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller()
export class CarrinhoController {
  constructor(private readonly service: CarrinhoService) {}

  // 1. ADICIONAR AO CARRINHO
  @Public()
  @Post('carrinho')
  adicionarAoCarrinho(@Body() dto: AdicionarCarrinhoDto) {
    const usuarioId = 1; // TODO: pegar do token JWT
    return this.service.adicionarAoCarrinho(dto, usuarioId);
  }

  // 2. REMOVER DO CARRINHO
  @Public()
  @Delete('carrinho/:itemId')
  removerDoCarrinho(@Param('itemId') itemId: string) {
    const usuarioId = 1; // TODO: pegar do token JWT
    return this.service.removerDoCarrinho(+itemId, usuarioId);
  }

  // 3. VER CARRINHO
  @Public()
  @Get('carrinho')
  verCarrinho() {
    const usuarioId = 1; // TODO: pegar do token JWT
    return this.service.verCarrinho(usuarioId);
  }

  // 4. CHECKOUT (FINALIZAR COMPRA)
  @Public()
  @Post('carrinho/checkout')
  checkout() {
    const usuarioId = 1; // TODO: pegar do token JWT
    return this.service.checkout(usuarioId);
  }

  // 5. LISTAR PEDIDOS
  @Public()
  @Get('pedidos')
  listarPedidos(@Query() filtros: FiltroPedidoDto) {
    const usuarioId = 1; // TODO: pegar do token JWT
    return this.service.listarPedidos(usuarioId, filtros);
  }

  // 6. DETALHAR PEDIDO
  @Public()
  @Get('pedidos/:id')
  detalharPedido(@Param('id') id: string) {
    const usuarioId = 1; // TODO: pegar do token JWT
    return this.service.detalharPedido(+id, usuarioId);
  }

  // 7. CANCELAR PEDIDO
  @Public()
  @Post('pedidos/:id/cancelar')
  cancelarPedido(@Param('id') id: string) {
    const usuarioId = 1; // TODO: pegar do token JWT
    return this.service.cancelarPedido(+id, usuarioId);
  }
}