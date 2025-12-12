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
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { FiltroComentarioDto } from './dto/filtro-comentario.dto';
=======
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';
import { UsuarioAtual } from '../common/decorators/usuarioAtual.decorator';
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
import { Public } from '../common/decorators/public.decorator';

@ApiTags('comentarios')
@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Cria um novo comentário' })
  @ApiResponse({ status: 201, description: 'O comentário foi criado com sucesso.', type: Comentario })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiBody({ type: CreateComentarioDto })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createComentarioDto: CreateComentarioDto, @UsuarioAtual() usuario): Promise<Comentario> {
    // Extrai o ID do usuário autenticado do token JWT
    const usuarioId = usuario.sub;
    return this.comentariosService.create(createComentarioDto, usuarioId);
  }

  @Public()
  @Get()
<<<<<<< HEAD
  findAll(@Query() filtros: FiltroComentarioDto) {
    return this.comentariosService.findAll(filtros);
  }

  @Public()
  @Get('entity/:entityType/:entityId')
  findByEntity(
    @Param('entityType') entityType: string,
    @Param('entityId', ParseIntPipe) entityId: number,
  ) {
    return this.comentariosService.findByEntity(entityId, entityType);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
=======
  @ApiOperation({ summary: 'Retorna todos os comentários' })
  @ApiResponse({ status: 200, description: 'Lista de comentários retornada com sucesso.', type: [Comentario] })
  findAll(): Promise<Comentario[]> {
    return this.comentariosService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Retorna um comentário pelo ID' })
  @ApiResponse({ status: 200, description: 'Comentário encontrado com sucesso.', type: Comentario })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Comentario> {
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
    return this.comentariosService.findOne(id);
  }

  @Public()
  @Patch(':id')
<<<<<<< HEAD
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ) {
=======
  @ApiOperation({ summary: 'Atualiza um comentário existente' })
  @ApiResponse({ status: 200, description: 'Comentário atualizado com sucesso.', type: Comentario })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: Number })
  @ApiBody({ type: UpdateComentarioDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ): Promise<Comentario> {
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
    return this.comentariosService.update(id, updateComentarioDto);
  }

  @Public()
  @Delete(':id')
<<<<<<< HEAD
  remove(@Param('id', ParseIntPipe) id: number) {
=======
  @ApiOperation({ summary: 'Remove um comentário pelo ID' })
  @ApiResponse({ status: 204, description: 'Comentário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: Number })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
    return this.comentariosService.remove(id);
  }
}

