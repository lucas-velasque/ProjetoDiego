import { IsString } from "class-validator";

export class criarCategoriaLeilaoDto {
  @IsString()
  nome!: string;
  @IsString()
  descricao!: string;
  @IsString()
  tipo!: string;
  @IsString()
  status!: string;
}
