import { IsOptional, IsString, IsInt, Min, Max, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroCartaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  raridade?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  categoria_id?: number;

  @IsOptional()
  @IsString()
  elemento?: string;

  @IsOptional()
  @IsString()
  expansao?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pontos_saude_min?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pontos_saude_max?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  custo_mana_min?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  custo_mana_max?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  preco_min?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  preco_max?: number;

  @IsOptional()
  @IsString()
  data_inicio?: string;

  @IsOptional()
  @IsString()
  data_fim?: string;

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
