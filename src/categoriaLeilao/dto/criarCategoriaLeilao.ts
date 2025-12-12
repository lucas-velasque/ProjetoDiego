import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class criarCategoriaLeilaoDto {
  @ApiProperty({
    description: 'Nome da categoria de leilão',
    example: 'Cartas Raras',
    maxLength: 100,
    required: true
  })
  @IsString()
  nome!: string;

  @ApiProperty({
    description: 'Descrição da categoria de leilão',
    example: 'Categoria para cartas raras de Pokémon',
    maxLength: 500,
    required: true
  })
  @IsString()
  descricao!: string;

  @ApiProperty({
    description: 'Tipo da categoria',
    example: 'RARA',
    enum: ['COMUM', 'RARA', 'LENDARIA', 'PROMOCIONAL'],
    required: true
  })
  @IsString()
  tipo!: string;

  @ApiProperty({
    description: 'Status da categoria',
    example: 'ATIVA',
    enum: ['ATIVA', 'INATIVA'],
    required: true
  })
  @IsString()
  status!: string;
}