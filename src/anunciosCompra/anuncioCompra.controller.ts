import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AnunciosCompraService } from './anuncioCompra.service';
import { CreateAnuncioCompraDto } from './dto/createAnuncioCompra.dto';
import { UpdateAnuncioCompraDto } from './dto/updateAnuncioCompra.dto';
import { Public } from '../common/decorators/public.decorator';
import { UsuarioAtual } from '../common/decorators/usuarioAtual.decorator';
import { FiltroAnuncioCompraDto } from './dto/filtroAnuncioCompra.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('Anúncios de Compra') // ← AQUI: Tag para agrupar todos os endpoints
@Controller('anuncios-compra')
export class AnunciosCompraController {
  constructor(private readonly service: AnunciosCompraService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Criar anúncio de compra',
    description: 'Cria um novo anúncio de compra para o usuário autenticado'
  })
  @ApiBody({
    type: CreateAnuncioCompraDto,
    description: 'Dados necessários para criar o anúncio de compra'
  })
  @ApiResponse({
    status: 201,
    description: 'Anúncio de compra criado com sucesso'
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos'
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado'
  })
  criar(@Body() dto: CreateAnuncioCompraDto, @UsuarioAtual() usuario) {
    // TEMPORÁRIO: usar ID fixo para testes sem autenticação
    const usuarioId = usuario?.sub || 1;
    return this.service.criar(dto, usuarioId);
  }

  @Public()
  @Get()
  @ApiOperation({ 
    summary: 'Listar anúncios de compra',
    description: 'Retorna uma lista de anúncios de compra com possibilidade de filtros' 
  })
  @ApiQuery({
    name: 'filtros',
    type: FiltroAnuncioCompraDto,
    required: false,
    description: 'Filtros opcionais para buscar anúncios específicos'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de anúncios de compra retornada com sucesso' 
  })
  listarTodos(@Query() filtros: FiltroAnuncioCompraDto) {
    return this.service.listarTodos(filtros);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar anúncio por ID',
    description: 'Retorna um anúncio de compra específico pelo seu ID' 
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'ID do anúncio de compra',
    example: 1 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Anúncio de compra encontrado com sucesso' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Anúncio de compra não encontrado' 
  })
  buscarPorId(@Param('id') id: string) {
    return this.service.buscarPorId(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar anúncio de compra',
    description: 'Atualiza um anúncio de compra existente'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID do anúncio de compra a ser atualizado',
    example: 1
  })
  @ApiBody({
    type: UpdateAnuncioCompraDto,
    description: 'Dados para atualização do anúncio de compra'
  })
  @ApiResponse({
    status: 200,
    description: 'Anúncio de compra atualizado com sucesso'
  })
  @ApiResponse({
    status: 404,
    description: 'Anúncio de compra não encontrado'
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos'
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado'
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão para editar este anúncio'
  })
  atualizar(@Param('id') id: string, @Body() dto: UpdateAnuncioCompraDto, @UsuarioAtual() usuario) {
    const usuarioId = usuario.sub;
    return this.service.atualizar(+id, dto, usuarioId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar anúncio de compra',
    description: 'Remove um anúncio de compra do sistema'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID do anúncio de compra a ser deletado',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Anúncio de compra deletado com sucesso'
  })
  @ApiResponse({
    status: 404,
    description: 'Anúncio de compra não encontrado'
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado'
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão para deletar este anúncio'
  })
  deletar(@Param('id') id: string, @UsuarioAtual() usuario) {
    const usuarioId = usuario.sub;
    return this.service.deletar(+id, usuarioId);
  }
}