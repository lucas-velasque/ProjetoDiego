import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class criarCategoriaCartaDto {
  @IsString()
  @ApiProperty({
    description: "Nome da categoria de carta",
    example: "Categoria A",
    required: true,
  })
  nome!: string;

  @IsString()
  @ApiProperty({
    description: "Descrição da categoria de carta",
    example: "Descrição da categoria A",
    required: true,
  })
  descricao!: string;

  @IsString()
  @ApiProperty({
    description: "Tipo da categoria de carta",
    example: "tipo1",
    required: true,
  })
  tipo!: string;

  @IsString()
  @ApiProperty({
    description: "Status da categoria de carta",
    example: "ativo",
    required: true,
  })
  status!: string;
}