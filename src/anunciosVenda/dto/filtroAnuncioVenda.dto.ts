import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginacaoDto } from '../../common/dto/paginacao.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FiltroAnuncioVendaDto extends PaginacaoDto {
  @ApiPropertyOptional({ description: 'Preço mínimo', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  preco_min?: number;

  @ApiPropertyOptional({ description: 'Preço máximo', example: 1000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  preco_max?: number;

  @ApiPropertyOptional({ description: 'Nome da carta', example: 'Black Lotus' })
  @IsOptional()
  @IsString()
  nome_carta?: string;

  @ApiPropertyOptional({ description: 'Condição da carta', example: 'Nova' })
  @IsOptional()
  @IsString()
  condicao?: string;

  @ApiPropertyOptional({ description: 'Raridade da carta', example: 'Rara' })
  @IsOptional()
  @IsString()
  raridade?: string;

  @ApiPropertyOptional({ 
    description: 'Status do anúncio', 
    enum: ['ativo', 'vendido', 'cancelado'],
    example: 'ativo'
  })
  @IsOptional()
  @IsEnum(['ativo', 'vendido', 'cancelado'])
  status?: string;

  @ApiPropertyOptional({ description: 'Data de início (YYYY-MM-DD)', example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  data_inicio?: string;

  @ApiPropertyOptional({ description: 'Data de fim (YYYY-MM-DD)', example: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  data_fim?: string;
}