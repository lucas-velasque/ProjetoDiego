// src/leiloes/dto/atualizar-lance-dto.ts
import { IsNumber, Min, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class AtualizarLanceDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valor?: number;
}
