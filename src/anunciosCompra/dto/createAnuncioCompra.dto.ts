import { IsString, IsNumber, IsOptional, IsEnum, Min, MaxLength, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnuncioCompraDto {
  @ApiProperty({
    example: 'Pikachu',
    description: 'Nome do Pokémon que se deseja comprar',
    maxLength: 255
  })
  @IsString()
  @MaxLength(255)
  nome_carta: string;

  @ApiPropertyOptional({
    example: 'Base Set',
    description: 'Expansão da carta de Pokémon',
    maxLength: 100
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  expansao?: string;

  @ApiPropertyOptional({
    example: '58/102',
    description: 'Número da carta na expansão',
    maxLength: 50
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  numero_expansao?: string;

  @ApiPropertyOptional({
    example: 'Rare Holo',
    description: 'Raridade da carta',
    enum: ['Common', 'Uncommon', 'Rare', 'Rare Holo', 'Rare Ultra', 'Secret Rare'],
    maxLength: 50
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  raridade?: string;

  @ApiPropertyOptional({
    example: 'First Edition',
    description: 'Edição da carta',
    enum: ['First Edition', 'Unlimited', 'Shadowless'],
    maxLength: 50
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  edicao?: string;

  @ApiProperty({
    example: 2,
    description: 'Quantidade de cartas desejadas',
    minimum: 1
  })
  @IsNumber()
  @Min(1)
  quantidade: number;

  @ApiPropertyOptional({
    example: 299.99,
    description: 'Preço máximo disposto a pagar por unidade (em R$)',
    minimum: 0
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  preco_maximo?: number;

  @ApiPropertyOptional({
    enum: ['Gem Mint', 'Mint', 'Near Mint', 'Excellent', 'Good', 'Light Played', 'Played', 'Poor'],
    example: 'Near Mint',
    description: 'Condição mínima aceitável da carta'
  })
  @IsEnum(['Gem Mint', 'Mint', 'Near Mint', 'Excellent', 'Good', 'Light Played', 'Played', 'Poor'])
  @IsOptional()
  condicao_minima?: string;

  @ApiPropertyOptional({
    example: ['Electric'],
    description: 'Tipo(s) do Pokémon',
    enum: ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy'],
    isArray: true
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tipos?: string[];

  @ApiPropertyOptional({
    example: 'Charizard Star',
    description: 'Variação especial da carta (ex: Star, EX, GX, V, VMAX)',
    maxLength: 50
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  variacao?: string;

  @ApiPropertyOptional({
    example: 'Busco Pikachu First Edition em Near Mint para minha coleção',
    description: 'Descrição adicional ou observações sobre a compra'
  })
  @IsString()
  @IsOptional()
  descricao?: string;
}