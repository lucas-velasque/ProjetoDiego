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

@Controller('cartas')
export class CartasController {
  constructor(private readonly cartasService: CartasService) {}

  @Public()
  @Post()
  create(@Body() createCartaDto: CreateCartaDto) {
    return this.cartasService.create(createCartaDto);
  }

  @Public()
  @Get()
  findAll(@Query() filtros: FiltroCartaDto) {
    return this.cartasService.findAll(filtros);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartasService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartaDto: UpdateCartaDto,
  ) {
    return this.cartasService.update(id, updateCartaDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartasService.remove(id);
  }
}
