import { IsString, IsNotEmpty, IsOptional, IsInt, IsNumber, IsUrl } from 'class-validator';

export class CreateCartaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  raridade: string;

  @IsOptional()
  @IsInt()
  categoria_id?: number;

  @IsOptional()
  @IsInt()
  pontos_saude?: number;

  @IsOptional()
  @IsInt()
  custo_mana?: number;

  @IsOptional()
  @IsString()
  elemento?: string;

  @IsOptional()
  @IsString()
  expansao?: string;

  @IsOptional()
  @IsString()
  numero_colecao?: string;

  @IsOptional()
  @IsUrl()
  imagem_url?: string;

  @IsOptional()
  @IsNumber()
  preco_medio?: number;
}
