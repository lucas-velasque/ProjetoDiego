import { IsString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CriarLeilaoDto {
  @ApiProperty({
    description: "Título do leilão da carta Pokémon",
    example: "Charizard Raro",
  })
  @IsString()
  titulo!: string;

  @ApiProperty({
    description: "Descrição detalhada da carta Pokémon",
    example:
      "Charizard primeira edição em perfeito estado, avaliada por especialistas",
  })
  @IsString()
  descricao!: string;

  @ApiProperty({
    description: "Preço inicial do leilão em unidades monetárias",
    minimum: 0,
    example: 1000,
  })
  @IsNumber()
  @Min(0)
  precoInicial!: number;

  @ApiProperty({
    description: "Categoria da carta Pokémon",
    example: "Rara",
  })
  @IsString()
  categoria!: string;

  @ApiProperty({
    description: "Status inicial do leilão",
    enum: ["ativo", "rascunho"],
    example: "ativo",
  })
  @IsString()
  status!: string;

  @ApiProperty({
    description: "Data e hora de término do leilão (ISO 8601)",
    example: "2024-12-31T23:59:59Z",
  })
  @IsString()
  data_fim!: string;

  @ApiProperty({
    description: "ID do usuário criador do leilão",
    example: 1,
  })
  @IsNumber()
  id_usuario_criar!: number;

  @ApiProperty({
    description: "Valor inicial do leilão",
    minimum: 0,
    example: 1000,
  })
  @IsNumber()
  valor_inicial!: number;

  @ApiProperty({
    description: "Valor atual do leilão (inicialmente igual ao valor inicial)",
    minimum: 0,
    example: 1000,
  })
  @IsNumber()
  valor_atual!: number;

  @ApiProperty({
    description: "Valor mínimo de incremento para novos lances",
    minimum: 0,
    example: 50,
  })
  @IsNumber()
  valor_incremento!: number;
}
