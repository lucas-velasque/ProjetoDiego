import { IsNumber, Min, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CriarLanceDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valor!: number;

  @Type(() => Number)
  @IsNumber()
  id_usuario!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id_leilao?: number;
}
