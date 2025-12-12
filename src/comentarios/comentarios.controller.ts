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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { FiltroComentarioDto } from './dto/filtro-comentario.dto';
import { Public } from '../common/decorators/public.decorator';
import { Comentario } from './entities/comentario.entity';

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
  create(@Body() createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    return this.comentariosService.create(createComentarioDto);
  }

  @Public()
  @Get()
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
    return this.comentariosService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ) {
    return this.comentariosService.update(id, updateComentarioDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comentariosService.remove(id);
  }
}

