import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AnunciosCompraService } from './anuncioCompra.service';
import { CreateAnuncioCompraDto } from './dto/createAnuncioCompra.dto';
import { UpdateAnuncioCompraDto } from './dto/updateAnuncioCompra.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('anuncios-compra')
export class AnunciosCompraController {
  constructor(private readonly service: AnunciosCompraService) {}

  @Public()
  @Post()
  criar(@Body() dto: CreateAnuncioCompraDto) {
    const usuarioId = 1; // TODO: pegar do token JWT
    return this.service.criar(dto, usuarioId);
  }

  @Public()
  @Get()
  listarTodos() {
    return this.service.listarTodos();
  }

  @Public()
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.service.buscarPorId(+id);
  }

  @Public()
  @Put(':id')
  atualizar(@Param('id') id: string, @Body() dto: UpdateAnuncioCompraDto) {
    return this.service.atualizar(+id, dto);
  }

  @Public()
  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.service.deletar(+id);
  }
}