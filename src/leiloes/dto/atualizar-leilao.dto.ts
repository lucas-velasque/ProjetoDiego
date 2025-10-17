import { IsString, IsNumber, Min, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class AtualizarLeilaoDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precoInicial?: number;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  data_fim?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_inicial?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_atual?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_incremento?: number;
}
