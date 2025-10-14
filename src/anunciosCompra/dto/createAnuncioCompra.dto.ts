import { IsString, IsNumber, IsOptional, IsEnum, Min, MaxLength } from 'class-validator';

export class CreateAnuncioCompraDto {
  @IsString()
  @MaxLength(255)
  nome_carta: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  expansao?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  numero_expansao?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  raridade?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  edicao?: string;

  @IsNumber()
  @Min(1)
  quantidade: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  preco_maximo?: number;

  @IsEnum(['Mint', 'Near Mint', 'Excellent', 'Good', 'Light Played', 'Played', 'Poor'])
  @IsOptional()
  condicao_minima?: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}