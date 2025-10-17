import { Min, IsOptional } from "class-validator";

export class AtualizarNivelUsuarioDto {
  @IsOptional()
  nome!: string;

  @IsOptional()
  descricao!: string;

  @IsOptional()
  @Min(0)
  pontuacaoMinima!: number;

  @IsOptional()
  corIdentificacao!: string;

  @IsOptional()
  id_cor!: number;
}
