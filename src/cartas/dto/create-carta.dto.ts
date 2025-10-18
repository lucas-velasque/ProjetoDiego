import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCartaDto {
  @ApiProperty({ description: 'Nome da carta Pokémon', example: 'Charizard' })
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Tipo da carta', example: 'Fire' })
  @IsString()
  tipo: string;

  @ApiProperty({ description: 'Pontos de saúde da carta', example: 120 })
  @IsInt()
  pontosSaude: number;

  @ApiPropertyOptional({ description: 'Categoria da carta', example: 'Pokémon de Estágio 2' })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiPropertyOptional({ description: 'Descrição da Pokédex', example: 'Cospe fogo que é quente o suficiente para derreter pedregulhos.' })
  @IsOptional()
  @IsString()
  descricaoPokedex?: string;

  @ApiPropertyOptional({ description: 'Dano causado pelo ataque', example: 100 })
  @IsOptional()
  @IsInt()
  danoCausado?: number;

  @ApiPropertyOptional({ description: 'Nome do ataque', example: 'Lança-chamas' })
  @IsOptional()
  @IsString()
  ataque?: string;

  @ApiPropertyOptional({ description: 'Custo de energia do ataque', example: '2 Fire, 1 Colorless' })
  @IsOptional()
  @IsString()
  custoAtaque?: string;

  @ApiPropertyOptional({ description: 'Efeitos adicionais do ataque' })
  @IsOptional()
  @IsString()
  efeitosAtaque?: string;

  @ApiPropertyOptional({ description: 'Nome do ilustrador', example: 'Mitsuhiro Arita' })
  @IsOptional()
  @IsString()
  ilustrador?: string;

  @ApiPropertyOptional({ description: 'Símbolo da expansão', example: 'BS' })
  @IsOptional()
  @IsString()
  simboloExpansao?: string;

  @ApiPropertyOptional({ description: 'Número na expansão', example: '4/102' })
  @IsOptional()
  @IsString()
  numeroExpansao?: string;

  @ApiPropertyOptional({ description: 'Raridade da carta', example: 'Rara Holográfica' })
  @IsOptional()
  @IsString()
  raridade?: string;

  @ApiPropertyOptional({ description: 'Tipo de fraqueza', example: 'Water' })
  @IsOptional()
  @IsString()
  fraqueza?: string;

  @ApiPropertyOptional({ description: 'Tipo de resistência', example: 'Fighting' })
  @IsOptional()
  @IsString()
  resistencia?: string;

  @ApiPropertyOptional({ description: 'Custo de recuo', example: '3 Colorless' })
  @IsOptional()
  @IsString()
  custoRecuo?: string;

  @ApiPropertyOptional({ description: 'Descrição adicional da Pokédex' })
  @IsOptional()
  @IsString()
  descricaoNaPokedex?: string;

  @ApiPropertyOptional({ description: 'ID da categoria relacionada' })
  @IsOptional()
  @IsInt()
  categoriaId?: number;
}