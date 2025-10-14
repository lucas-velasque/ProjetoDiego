import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, Min, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAnuncioVendaCartaDto {
  @IsNumber()
  carta_id: number;

  @IsNumber()
  @Min(1)
  quantidade: number;

  @IsString()
  @IsOptional()
  condicao?: string;

  @IsString()
  @IsOptional()
  observacoes?: string;
}

export class CreateAnuncioVendaDto {
  @IsString()
  @MaxLength(255)
  titulo: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @Min(0)
  preco_total: number;

  @IsNumber()
  @Min(1)
  quantidade_disponivel: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnuncioVendaCartaDto)
  cartas: CreateAnuncioVendaCartaDto[];
}