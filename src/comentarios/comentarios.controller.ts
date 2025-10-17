import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
//erro de caminho de import aqui
import { Comentario } from './entities/comentario.entity';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    return this.comentariosService.create(createComentarioDto);
  }

  @Get()
  findAll(): Promise<Comentario[]> {
    return this.comentariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Comentario> {
    return this.comentariosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ): Promise<Comentario> {
    return this.comentariosService.update(id, updateComentarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.comentariosService.remove(id);
  }
}

