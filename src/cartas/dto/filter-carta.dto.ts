import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterCartaDto {
  @ApiPropertyOptional({ description: 'Página atual', minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Itens por página', minimum: 1, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Nome da carta' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ description: 'Tipo da carta (ex: Fire, Water, Grass)' })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiPropertyOptional({ description: 'Categoria da carta' })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiPropertyOptional({ description: 'Raridade da carta' })
  @IsOptional()
  @IsString()
  raridade?: string;

  @ApiPropertyOptional({ description: 'Símbolo da expansão' })
  @IsOptional()
  @IsString()
  simboloExpansao?: string;

  @ApiPropertyOptional({ description: 'Ilustrador da carta' })
  @IsOptional()
  @IsString()
  ilustrador?: string;

  @ApiPropertyOptional({ description: 'Campo para ordenação', enum: ['nome', 'pontosSaude', 'raridade', 'createdAt'] })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional({ description: 'Direção da ordenação', enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'ASC';
}