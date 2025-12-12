import { IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class atualizarCategoriaCartaDto {
  @IsOptional()
  @ApiPropertyOptional({
    description: "Nome da categoria de carta",
    example: "Categoria A",
  })
  nome!: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: "Descrição da categoria de carta",
    example: "Descrição da categoria A",
  })
  descricao!: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: "Tipo da categoria de carta",
    example: "tipo1",
  })
  tipo!: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: "Status da categoria de carta",
    example: "ativo",
  })
  status!: string;
}