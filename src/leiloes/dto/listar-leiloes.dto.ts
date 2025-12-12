// src/leiloes/dto/listar-leiloes.dto.ts
import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class ListarLeiloesDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  // filtros extras
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  usuarioId?: number;

  @IsOptional()
  @Type(() => Number)
  ganhadorId?: number;
}
