import { IsNumber, Min, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class AtualizarLanceDto {
  @ApiProperty({
    description: 'Valor do lance para carta Pokémon',
    minimum: 0,
    example: 1500,
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valor?: number;
}