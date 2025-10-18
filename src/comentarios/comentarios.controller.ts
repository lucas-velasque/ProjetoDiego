import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';
import { UsuarioAtual } from '../common/decorators/usuarioAtual.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('comentarios')
@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

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
    return this.comentariosService.findOne(id);
  }

  @Patch(':id')
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
    return this.comentariosService.update(id, updateComentarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um comentário pelo ID' })
  @ApiResponse({ status: 204, description: 'Comentário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: Number })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.comentariosService.remove(id);
  }
}

