import { IsString } from "class-validator";

export class criarCategoriaCartaDto {
  @IsString()
  nome!: string;
  @IsString()
  descricao!: string;
  @IsString()
  tipo!: string;
  @IsString()
  status!: string;
}
