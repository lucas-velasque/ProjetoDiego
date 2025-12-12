// src/leiloes/leiloes.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
} from "@nestjs/common";
import { LeiloesService } from "./leiloes.service";
import { CriarLeilaoDto } from "./dto/criar-leilao.dto";
import { AtualizarLeilaoDto } from "./dto/atualizar-leilao.dto";
import { FiltroLeilaoDto } from "./dto/filtro-leilao.dto";
import { Public } from "src/common/decorators/public.decorator";

@Controller("leiloes")
export class LeiloesController {
  constructor(private readonly service: LeiloesService) {}
  @Public()
  @Post()
  async criar(@Body() dto: CriarLeilaoDto) {
    try {
      const data = await this.service.criar(dto);
      return { message: "Leilão criado com sucesso.", data };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao criar leilão.");
    }
  }
  @Public()
  @Get()
  async listar(@Query() filtros: FiltroLeilaoDto) {
    try {
      const result = await this.service.listar(filtros);
      return {
        message: "Leilões listados com sucesso.",
        ...result,
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao listar leilões.");
    }
  }
  @Public()
  @Get(":id")
  async visualizar(@Param("id", ParseIntPipe) id: number) {
    try {
      const data = await this.service.visualizar(id);
      if (!data) throw new NotFoundException("Leilão não encontrado.");
      return { message: "Leilão recuperado com sucesso.", data };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao buscar leilão.");
    }
  }
  @Public()
  @Patch(":id")
  async atualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: AtualizarLeilaoDto,
  ) {
    try {
      const result = await this.service.atualizar(id, dto);
      const affected = Array.isArray(result)
        ? result[0]
        : typeof result === "number"
          ? result
          : 0;

      if (!affected)
        throw new NotFoundException("Leilão não encontrado para atualização.");

      // Opcional: retornar o registro atualizado
      const data = await this.service.visualizar(id);
      return { message: "Leilão atualizado com sucesso.", data };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao atualizar leilão.");
    }
  }
  @Public()
  @Delete(":id")
  async deletar(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.service.deletar(id);
      if (!deleted)
        throw new NotFoundException("Leilão não encontrado para exclusão.");
      return { message: "Leilão removido com sucesso." };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao remover leilão.");
    }
  }
}
