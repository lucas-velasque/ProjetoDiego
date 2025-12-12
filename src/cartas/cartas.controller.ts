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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CartasService } from './cartas.service';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
import { FiltroCartaDto } from './dto/filtro-carta.dto';
import { Public } from '../common/decorators/public.decorator';

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
  @ApiOperation({ summary: 'Listar todas as cartas com filtros e paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cartas retornada com sucesso'
  })
  findAll(@Query() filtros: FiltroCartaDto) {
    return this.cartasService.findAll(filtros);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma carta específica por ID' })
  @ApiParam({ name: 'id', description: 'ID da carta', type: 'number' })
  @ApiResponse({ status: 200, description: 'Carta encontrada' })
  @ApiResponse({ status: 404, description: 'Carta não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartasService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma carta existente' })
  @ApiParam({ name: 'id', description: 'ID da carta', type: 'number' })
  @ApiResponse({ status: 200, description: 'Carta atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Carta não encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartaDto: UpdateCartaDto,
  ) {
    return this.cartasService.update(id, updateCartaDto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma carta' })
  @ApiParam({ name: 'id', description: 'ID da carta', type: 'number' })
  @ApiResponse({ status: 200, description: 'Carta removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Carta não encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartasService.remove(id);
  }
}