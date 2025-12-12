//aaaaaa
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
import { CriarLanceDto } from "./dto/criar-lance.dto";
import { ListarLeiloesDto } from "./dto/listar-leiloes.dto";

@Controller("leiloes")
export class LeiloesController {
  constructor(private readonly service: LeiloesService) {}

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

  @Get()
  async listar(@Query() query: ListarLeiloesDto) {
    try {
      const { data, total, page, lastPage } = await this.service.listar(query);
      return {
        message: "Leilões listados com sucesso.",
        data,
        meta: { total, page, lastPage },
      };
    } catch {
      throw new InternalServerErrorException("Falha ao listar leilões.");
    }
  }

  @Get(":id")
  async visualizar(@Param("id") id: string) {
    try {
      const data = await this.service.visualizar(id);
      if (!data) {
        throw new NotFoundException("Leilão não encontrado.");
      }
      return { message: "Leilão recuperado com sucesso.", data };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao buscar leilão.");
    }
  }

  @Patch(":id")
  async atualizar(@Param("id") id: string, @Body() dto: AtualizarLeilaoDto) {
    try {
      const result = await this.service.atualizar(id, dto);

      const affected = Array.isArray(result)
        ? result[0]
        : typeof result === "number"
          ? result
          : 0;

      if (!affected) {
        throw new NotFoundException("Leilão não encontrado para atualização.");
      }

      const data = await this.service.visualizar(id);
      return { message: "Leilão atualizado com sucesso.", data };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao atualizar leilão.");
    }
  }

  @Delete(":id")
  async deletar(@Param("id") id: string) {
    try {
      const deleted = await this.service.deletar(id);
      if (!deleted) {
        throw new NotFoundException("Leilão não encontrado para exclusão.");
      }
      return { message: "Leilão removido com sucesso." };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao remover leilão.");
    }
  }

  // Dar lance
  @Post(":id/lances")
  async darLance(@Param("id") leilaoId: string, @Body() dto: CriarLanceDto) {
    try {
      if (dto.id_usuario == null || dto.valor == null) {
        return {
          message: "Informe o id do usuário (id_usuario) e o valor do lance.",
        };
      }

      const resp = await this.service.darLance(
        dto.id_usuario,
        leilaoId,
        dto.valor,
      );
      return { message: "Lance registrado com sucesso.", ...resp };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao dar lance.");
    }
  }

  // Encerrar leilão manualmente
  @Patch(":id/encerrar")
  async encerrar(@Param("id") id: string) {
    try {
      const data = await this.service.encerrarManual(id);
      return { message: "Leilão encerrado manualmente.", data };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Falha ao encerrar leilão.");
    }
  }

  // Leilões vencidos por mim (público: passar usuarioId na query)
  @Get("me/vencidos")
  async vencidosPorMim(@Query("usuarioId", ParseIntPipe) usuarioId: number) {
    try {
      const data = await this.service.leiloesVencidosPor(usuarioId);
      return { message: "Leilões vencidos recuperados com sucesso.", data };
    } catch {
      throw new InternalServerErrorException(
        "Falha ao consultar leilões vencidos.",
      );
    }
  }

  // Meus leilões ativos (público: passar usuarioId na query)
  @Get("me/ativos")
  async meusAtivos(@Query("usuarioId", ParseIntPipe) usuarioId: number) {
    try {
      const data = await this.service.meusLeiloesAtivos(usuarioId);
      return { message: "Leilões ativos recuperados com sucesso.", data };
    } catch {
      throw new InternalServerErrorException(
        "Falha ao consultar leilões ativos.",
      );
    }
  }
}
