import {
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsDateString,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CriarLeilaoDto {
  @ApiProperty()
  @IsString()
  titulo!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ example: "aberto", required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: 100 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precoInicial!: number;

  @ApiProperty({ example: 100, required: false, description: "Se não informado, será igual ao precoInicial" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precoAtual?: number;

  @ApiProperty({ example: 5 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  valor_incremento!: number;

  @ApiProperty({
    example: "2030-12-31T23:59:59.000Z",
    description: "Data/hora de término em formato ISO",
  })
  @IsDateString()
  terminaEm!: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  vendedorId!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoriaLeilaoId?: number;
}
