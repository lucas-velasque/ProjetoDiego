import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AnunciosVendaService } from './anuncioVenda.service';
import { CreateAnuncioVendaDto } from './dto/createAnuncioVenda.dto';
import { UpdateAnuncioVendaDto } from './dto/updateAnuncioVenda.dto';
import { Public } from '../common/decorators/public.decorator'; //tornar rotas públicas para testar com o thunderclient/insomnia/postman
import { FiltroAnuncioVendaDto } from './dto/filtroAnuncioVenda.dto';
import { Query } from '@nestjs/common';

@Controller('anuncios-venda')
export class AnunciosVendaController {
  constructor(private readonly service: AnunciosVendaService) {}

  @Public() //tornar rota pública para testar com o thunderclient/insomnia/postman
  @Post()
  criar(@Body() dto: CreateAnuncioVendaDto, @Request() req) {
    const usuarioId = 1; // TODO: token JWT
    return this.service.criar(dto, usuarioId);
  }

 @Public()
@Get()
listarTodos(@Query() filtros: FiltroAnuncioVendaDto) {
  return this.service.listarTodos(filtros);
}

  @Public() //tornar rota pública para testar com o thunderclient/insomnia/postman
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.service.buscarPorId(+id);
  }

  @Public() //tornar rota pública para testar com o thunderclient/insomnia/postman
  @Put(':id')
  atualizar(@Param('id') id: string, @Body() dto: UpdateAnuncioVendaDto) {
    return this.service.atualizar(+id, dto);
  }

  @Public() //tornar rota pública para testar com o thunderclient/insomnia/postman
  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.service.deletar(+id);
  }
}