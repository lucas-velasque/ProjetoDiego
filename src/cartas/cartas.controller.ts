<<<<<<< HEAD
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CartasService } from './cartas.service';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
import { FiltroCartaDto } from './dto/filtro-carta.dto';
import { Public } from '../common/decorators/public.decorator';
=======
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CartasService } from './cartas.service';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
import { FilterCartaDto } from './dto/filter-carta.dto';
import { PaginatedCartasDto } from './dto/paginated-response.dto';
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036

@ApiTags('Cartas Pokémon')
@Controller('cartas')
export class CartasController {
  constructor(private readonly cartasService: CartasService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Criar uma nova carta Pokémon' })
  @ApiResponse({ status: 201, description: 'Carta criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createCartaDto: CreateCartaDto) {
    return this.cartasService.create(createCartaDto);
  }

  @Public()
  @Get()
<<<<<<< HEAD
  findAll(@Query() filtros: FiltroCartaDto) {
    return this.cartasService.findAll(filtros);
=======
  @ApiOperation({ summary: 'Listar todas as cartas com filtros e paginação' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de cartas retornada com sucesso',
    type: PaginatedCartasDto 
  })
  findAll(@Query() filterDto: FilterCartaDto): Promise<PaginatedCartasDto> {
    return this.cartasService.findAll(filterDto);
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }

  @Public()
  @Get(':id')
<<<<<<< HEAD
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartasService.findOne(id);
=======
  @ApiOperation({ summary: 'Buscar uma carta específica por ID' })
  @ApiParam({ name: 'id', description: 'ID da carta', type: 'number' })
  @ApiResponse({ status: 200, description: 'Carta encontrada' })
  @ApiResponse({ status: 404, description: 'Carta não encontrada' })
  findOne(@Param('id') id: string) {
    return this.cartasService.findOne(+id);
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }

  @Public()
  @Patch(':id')
<<<<<<< HEAD
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartaDto: UpdateCartaDto,
  ) {
    return this.cartasService.update(id, updateCartaDto);
=======
  @ApiOperation({ summary: 'Atualizar uma carta existente' })
  @ApiParam({ name: 'id', description: 'ID da carta', type: 'number' })
  @ApiResponse({ status: 200, description: 'Carta atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Carta não encontrada' })
  update(@Param('id') id: string, @Body() updateCartaDto: UpdateCartaDto) {
    return this.cartasService.update(+id, updateCartaDto);
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }

  @Public()
  @Delete(':id')
<<<<<<< HEAD
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartasService.remove(id);
=======
  @ApiOperation({ summary: 'Remover uma carta' })
  @ApiParam({ name: 'id', description: 'ID da carta', type: 'number' })
  @ApiResponse({ status: 200, description: 'Carta removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Carta não encontrada' })
  remove(@Param('id') id: string) {
    return this.cartasService.remove(+id);
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }
}