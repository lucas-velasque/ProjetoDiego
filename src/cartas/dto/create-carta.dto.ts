import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateCartaDto {
  @IsString()
  nome: string;

  @IsString()
  tipo: string;

  @IsInt()
  pontosSaude: number;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsString()
  descricaoPokedex?: string;

  @IsOptional()
  @IsInt()
  danoCausado?: number;

  @IsOptional()
  @IsString()
  ataque?: string;

  @IsOptional()
  @IsString()
  custoAtaque?: string;

  @IsOptional()
  @IsString()
  efeitosAtaque?: string;

  @IsOptional()
  @IsString()
  ilustrador?: string;

  @IsOptional()
  @IsString()
  simboloExpansao?: string;

  @IsOptional()
  @IsString()
  numeroExpansao?: string;

  @IsOptional()
  @IsString()
  raridade?: string;

  @IsOptional()
  @IsString()
  fraqueza?: string;

  @IsOptional()
  @IsString()
  resistencia?: string;

  @IsOptional()
  @IsString()
  custoRecuo?: string;

  @IsOptional()
  @IsString()
  descricaoNaPokedex?: string;
}
