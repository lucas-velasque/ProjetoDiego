import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PropostasService } from './propostas.service';
import { CreatePropostaDto } from './dto/createProposta.dto';
import { UpdatePropostaDto } from './dto/updateProposta.dto';
import { Public } from '../common/decorators/public.decorator';
import { FiltroPropostaDto } from './dto/filtroPropostas.dto';
import { Query } from '@nestjs/common';

@Controller()
export class PropostasController {
  constructor(private readonly service: PropostasService) {}

  @Public()
  @Post('anuncios/:tipo/:id/propostas')
  criar(
    @Param('tipo') tipo: string,
    @Param('id') anuncioId: string,
    @Body() dto: CreatePropostaDto,
  ) {
    const usuarioId = 1; // TODO: pegar do token JWT
    return this.service.criar(dto, tipo, +anuncioId, usuarioId);
  }

@Public()
@Get('anuncios/:tipo/:id/propostas')
listarPorAnuncio(
  @Param('tipo') tipo: string,
  @Param('id') anuncioId: string,
  @Query() filtros: FiltroPropostaDto,
) {
  return this.service.listarPorAnuncio(tipo, +anuncioId, filtros);
}

  @Public()
  @Get('propostas/:id')
  buscarPorId(@Param('id') id: string) {
    return this.service.buscarPorId(+id);
  }

  @Public()
  @Put('propostas/:id')
  atualizar(@Param('id') id: string, @Body() dto: UpdatePropostaDto) {
    return this.service.atualizar(+id, dto);
  }

  @Public()
  @Delete('propostas/:id')
  deletar(@Param('id') id: string) {
    return this.service.deletar(+id);
  }

  @Public()
  @Put('propostas/:id/aceitar')
  aceitar(@Param('id') id: string) {
    return this.service.aceitar(+id);
  }
}