import { IsOptional } from "class-validator";

export class atualizarCategoriaLeilaoDto {
  @IsOptional()
  nome!: string;
  @IsOptional()
  descricao!: string;
  @IsOptional()
  tipo!: string;
  @IsOptional()
  status!: string;
}
