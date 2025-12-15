import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, Min, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateAnuncioVendaCartaDto {
  @ApiProperty({ description: 'ID da carta', example: 1 })
  @IsNumber()
  carta_id: number;

  @ApiProperty({ description: 'Quantidade de cartas', minimum: 1, example: 5 })
  @IsNumber()
  @Min(1)
  quantidade: number;

  @ApiPropertyOptional({ description: 'Condição da carta', example: 'Nova' })
  @IsString()
  @IsOptional()
  condicao?: string;

  @ApiPropertyOptional({ description: 'Observações sobre a carta', example: 'Carta em perfeito estado' })
  @IsString()
  @IsOptional()
  observacoes?: string;

  @ApiPropertyOptional({ description: 'URL da foto da carta', example: 'https://supabase.co/storage/...' })
  @IsString()
  @IsOptional()
  foto_url?: string;
}

export class CreateAnuncioVendaDto {
  @ApiProperty({ description: 'Título do anúncio', maxLength: 255, example: 'Vendo cartas raras de Pokemon' })
  @IsString()
  @MaxLength(255)
  titulo: string;

  @ApiPropertyOptional({ description: 'Descrição detalhada do anúncio', example: 'Coleção de cartas raras em ótimo estado de conservação' })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ description: 'Preço total do anúncio', minimum: 0, example: 150.50 })
  @IsNumber()
  @Min(0)
  preco_total: number;

  @ApiProperty({ description: 'Quantidade disponível', minimum: 1, example: 10 })
  @IsNumber()
  @Min(1)
  quantidade_disponivel: number;

  @ApiProperty({ type: [CreateAnuncioVendaCartaDto], description: 'Lista de cartas incluídas no anúncio' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnuncioVendaCartaDto)
  cartas: CreateAnuncioVendaCartaDto[];
}