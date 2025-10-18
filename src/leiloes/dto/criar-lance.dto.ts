import { IsNumber, Min, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CriarLanceDto {
  @ApiProperty({
    description: "Valor do lance para a carta Pokémon",
    minimum: 0,
    example: 1500,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valor!: number;

  @ApiProperty({
    description: "ID do usuário que está realizando o lance",
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  id_usuario!: number;

  @ApiProperty({
    description: "ID do leilão onde o lance será realizado",
    example: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id_leilao?: number;
}
