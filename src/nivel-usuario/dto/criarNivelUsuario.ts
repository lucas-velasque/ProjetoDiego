import { IsString, IsNumber } from "class-validator";

export class criarNivelUsuarioDto {
  @IsString()
  nome!: string;
  @IsString()
  descricao!: string;
  @IsNumber()
  pontuacaoMinima!: number;
  @IsString()
  corIdentificacao!: string;
}
