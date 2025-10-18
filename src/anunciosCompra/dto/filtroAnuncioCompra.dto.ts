import { IsOptional, IsString, IsNumber, IsEnum, IsDateString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginacaoDto } from '../../common/dto/paginacao.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FiltroAnuncioCompraDto extends PaginacaoDto {
  @ApiPropertyOptional({
    example: 'Charizard',
    description: 'Filtrar por nome do Pokémon (busca parcial)'
  })
  @IsOptional()
  @IsString()
  nome_carta?: string;

  @ApiPropertyOptional({
    example: 'Rare Holo',
    description: 'Filtrar por raridade da carta',
    enum: ['Common', 'Uncommon', 'Rare', 'Rare Holo', 'Rare Ultra', 'Secret Rare']
  })
  @IsOptional()
  @IsString()
  raridade?: string;

  @ApiPropertyOptional({
    example: 'Base Set',
    description: 'Filtrar por expansão da carta'
  })
  @IsOptional()
  @IsString()
  expansao?: string;

  @ApiPropertyOptional({
    example: 500,
    description: 'Filtrar por preço máximo (em R$)'
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  preco_maximo?: number;

  @ApiPropertyOptional({
    enum: ['ativo', 'fechado', 'cancelado'],
    example: 'ativo',
    description: 'Filtrar por status do anúncio'
  })
  @IsOptional()
  @IsEnum(['ativo', 'fechado', 'cancelado'])
  status?: string;

  @ApiPropertyOptional({
    example: 'Fire',
    description: 'Filtrar por tipo do Pokémon',
    enum: ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy']
  })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiPropertyOptional({
    example: 'First Edition',
    description: 'Filtrar por edição da carta',
    enum: ['First Edition', 'Unlimited', 'Shadowless']
  })
  @IsOptional()
  @IsString()
  edicao?: string;

  @ApiPropertyOptional({
    example: '2024-01-01',
    description: 'Data de início para filtrar anúncios criados a partir desta data'
  })
  @IsOptional()
  @IsDateString()
  data_inicio?: string;

  @ApiPropertyOptional({
    example: '2024-12-31',
    description: 'Data de fim para filtrar anúncios criados até esta data'
  })
  @IsOptional()
  @IsDateString()
  data_fim?: string;
}