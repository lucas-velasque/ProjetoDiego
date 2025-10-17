import { IsString, IsNumber, Min } from "class-validator";

export class criarNivelUsuarioDto {
  @IsString()
  nome!: string;

  @IsString()
  descricao!: string;

  @IsNumber()
  @Min(0)
  pontuacaoMinima!: number;

  @IsString()
  corIdentificacao!: string;

  @IsNumber()
  id_cor!: number;
}
