import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginacaoDto } from '../../common/dto/paginacao.dto';

export class FiltroAnuncioVendaDto extends PaginacaoDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  preco_min?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  preco_max?: number;

  @IsOptional()
  @IsString()
  nome_carta?: string;

  @IsOptional()
  @IsString()
  condicao?: string;

  @IsOptional()
  @IsString()
  raridade?: string;

  @IsOptional()
  @IsEnum(['ativo', 'vendido', 'cancelado'])
  status?: string;

  @IsOptional()
  @IsDateString()
  data_inicio?: string;

  @IsOptional()
  @IsDateString()
  data_fim?: string;
}