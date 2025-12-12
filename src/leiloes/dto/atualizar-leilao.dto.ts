import { IsString, IsNumber, Min, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class AtualizarLeilaoDto {
  @ApiProperty({
    description: "Título do leilão da carta Pokémon",
    example: "Charizard Raro - Edição Especial",
    required: false,
  })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({
    description: "Descrição detalhada da carta Pokémon",
    example:
      "Charizard primeira edição em perfeito estado, avaliada por especialistas",
    required: false,
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({
    description: "Preço inicial do leilão em unidades monetárias",
    minimum: 0,
    example: 1200,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precoInicial?: number;

  @ApiProperty({
    description: "Categoria da carta Pokémon",
    example: "Rara",
    required: false,
  })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiProperty({
    description: "Status atual do leilão",
    enum: ["ativo", "finalizado", "cancelado"],
    example: "ativo",
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    description: "Data e hora de término do leilão (ISO 8601)",
    example: "2024-12-31T23:59:59Z",
    required: false,
  })
  @IsOptional()
  @IsString()
  data_fim?: string;

  @ApiProperty({
    description: "Valor inicial do leilão",
    minimum: 0,
    example: 1200,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_inicial?: number;

  @ApiProperty({
    description: "Valor atual do leilão (maior lance atual)",
    minimum: 0,
    example: 1500,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_atual?: number;

  @ApiProperty({
    description: "Valor mínimo de incremento para novos lances",
    minimum: 0,
    example: 75,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_incremento?: number;
}
