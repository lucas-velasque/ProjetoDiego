import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Query,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import { NivelUsuarioService } from "./nivelUsuario.service";
import { criarNivelUsuarioDto } from "./dto/criarNivelUsuario";
import { AtualizarNivelUsuarioDto } from "./dto/atualizarNivelUsuario";
import { RolesGuard } from "./../common/guards/roles.guard";
import { Roles } from "./../common/decorators/roles.decorator";
import { Role } from "../common/roles.enum";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("NivelUsuario")
@Controller("NivelUsuario")
@UseGuards(RolesGuard)
export class NivelUsuarioController {
  constructor(private readonly servico: NivelUsuarioService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Criar um novo nível de usuário" })
  @ApiResponse({
    status: 201,
    description: "Nível de usuário criado com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description: "Erro ao criar nível de usuário.",
  })
  @ApiBody({ type: criarNivelUsuarioDto, required: true })
  async criar(@Body() criarDto: criarNivelUsuarioDto) {
    try {
      const nivelCriado = await this.servico.criar(criarDto);
      return {
        mensagem: "Nível de usuário criado com sucesso.",
        dados: nivelCriado,
      };
    } catch (error) {
      throw new BadRequestException("Erro ao criar nível de usuário.");
    }
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: "Listar categorias de usuario" })
  @ApiResponse({
    status: 200,
    description: "Lista de nivel de usuario retornada com sucesso.",
  })
  @ApiQuery({
    name: "nome",
    required: false,
    description: "Filtrar nivel por nome",
  })
  @ApiQuery({
    name: "corIdentificacao",
    required: false,
    description: "Filtrar usuario por corIdentificacao",
  })
  @ApiQuery({
    name: "page",
    required: false,
    description: "Número da página para paginação",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Limite de itens por página",
  })
  async listar(
    @Query("nome") nome?: string,
    @Query("corIdentificacao") corIdentificacao?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    const filtros = {
      nome,
      corIdentificacao,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    };
    return await this.servico.listar(filtros);
  }

  @Get(":id")
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: "Buscar um nivel de usuario por ID" })
  @ApiResponse({
    status: 200,
    description: "Nivel de usuario encontrado com sucesso.",
  })
  @ApiResponse({
    status: 404,
    description: "Nivel de usuario não encontrado.",
  })
  @ApiParam({
    name: "id",
    description: "ID do nivel de usario",
    type: Number,
  })
  async buscarUm(@Param("id", ParseIntPipe) id: number) {
    const nivel = await this.servico.buscar_um(id);
    if (!nivel) {
      throw new NotFoundException("Nível de usuário não encontrado.");
    }
    return {
      mensagem: "Nível de usuário encontrado.",
      dados: nivel,
    };
  }

  @Put(":id")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Atualizar um nivel de usuario" })
  @ApiResponse({
    status: 200,
    description: "Nivel de usuario atualizado com sucesso.",
  })
  @ApiResponse({
    status: 404,
    description: "Nivel de usuario não encontrado para atualização.",
  })
  @ApiParam({
    name: "id",
    description: "ID do nivel de usuario",
    type: Number,
  })
  @ApiBody({ type: AtualizarNivelUsuarioDto })
  async atualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() atualizarDto: AtualizarNivelUsuarioDto
  ) {
    const nivelAtualizado = await this.servico.atualizar(id, atualizarDto);
    if (!nivelAtualizado) {
      throw new NotFoundException(
        "Nível de usuário não encontrado para atualização."
      );
    }
    return {
      mensagem: "Nível de usuário atualizado com sucesso.",
      dados: nivelAtualizado,
    };
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Excluir um nivel de usuario" })
  @ApiResponse({
    status: 200,
    description: "Nivel de usuario excluído com sucesso.",
  })
  @ApiResponse({
    status: 404,
    description: "Nivel de usuario encontrado para exclusão.",
  })
  @ApiParam({
    name: "id",
    description: "ID do nivel de usuario",
    type: Number,
  })
  async deletar(@Param("id", ParseIntPipe) id: number) {
    const resultado = await this.servico.deletar(id);
    if (!resultado) {
      throw new NotFoundException(
        "Nível de usuário não encontrado para exclusão."
      );
    }
    return { mensagem: "Nível de usuário excluído com sucesso." };
  }
}
