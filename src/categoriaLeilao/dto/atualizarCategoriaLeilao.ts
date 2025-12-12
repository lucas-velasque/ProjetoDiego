import { IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class atualizarCategoriaLeilaoDto {
  @ApiPropertyOptional({
    description: 'Nome da categoria de leilão',
    example: 'Cartas Raras',
    maxLength: 100
  })
  @IsOptional()
  nome!: string;

  @ApiPropertyOptional({
    description: 'Descrição da categoria de leilão',
    example: 'Categoria para cartas raras de Pokémon',
    maxLength: 500
  })
  @IsOptional()
  descricao!: string;

  @ApiPropertyOptional({
    description: 'Tipo da categoria',
    example: 'RARA',
    enum: ['COMUM', 'RARA', 'LENDARIA', 'PROMOCIONAL']
  })
  @IsOptional()
  tipo!: string;

  @ApiPropertyOptional({
    description: 'Status da categoria',
    example: 'ATIVA',
    enum: ['ATIVA', 'INATIVA']
  })
  @IsOptional()
  status!: string;
}