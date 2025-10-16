import { IsOptional } from "class-validator";

export class atualizarNivelUsuarioDto {
  @IsOptional()
  nome!: string;

  @IsOptional()
  descricao!: string;

  @IsOptional()
  pontuacaoMinima!: number;

  @IsOptional()
  corIdentificacao!: string;
}
