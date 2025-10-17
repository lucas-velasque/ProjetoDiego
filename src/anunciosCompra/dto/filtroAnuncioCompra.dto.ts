import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginacaoDto } from '../../common/dto/paginacao.dto';

export class FiltroAnuncioCompraDto extends PaginacaoDto {
  @IsOptional()
  @IsString()
  nome_carta?: string;

  @IsOptional()
  @IsString()
  raridade?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  preco_maximo?: number;

  @IsOptional()
  @IsEnum(['ativo', 'fechado', 'cancelado'])
  status?: string;

  @IsOptional()
  @IsDateString()
  data_inicio?: string;

  @IsOptional()
  @IsDateString()
  data_fim?: string;
}