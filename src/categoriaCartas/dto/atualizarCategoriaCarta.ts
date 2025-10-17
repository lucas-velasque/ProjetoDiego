import { IsOptional } from "class-validator";

export class atualizarCategoriaCartaDto {
  @IsOptional()
  nome!: string;

  @IsOptional()
  descricao!: string;

  @IsOptional()
  tipo!: string;
}
