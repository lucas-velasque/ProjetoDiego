import { IsOptional, IsString, IsInt, Min, Max, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroLeilaoDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsEnum(['ativo', 'finalizado', 'cancelado'])
  status?: 'ativo' | 'finalizado' | 'cancelado';

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  categoria_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lance_inicial_min?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lance_inicial_max?: number;

  @IsOptional()
  @IsString()
  data_inicio?: string;

  @IsOptional()
  @IsString()
  data_fim?: string;

  @IsOptional()
  @IsString()
  data_termino_inicio?: string;

  @IsOptional()
  @IsString()
  data_termino_fim?: string;

  // Paginação
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
