import { IsString, IsNumber, Min } from "class-validator";

export class CriarLeilaoDto {
  @IsString() titulo!: string;

  @IsString() descricao!: string;

  @IsNumber() @Min(0) precoInicial!: number;

  @IsString() categoria!: string;

  @IsString() status!: string;

  @IsString() data_fim!: string;

  @IsNumber() id_usuario_criar!: number;

  @IsNumber() valor_inicial!: number;

  @IsNumber() valor_atual!: number;

  @IsNumber() valor_incremento!: number;
}
