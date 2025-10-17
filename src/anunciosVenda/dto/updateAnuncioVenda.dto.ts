import { PartialType } from '@nestjs/mapped-types';
import { CreateAnuncioVendaDto } from './createAnuncioVenda.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAnuncioVendaDto extends PartialType(CreateAnuncioVendaDto) {
  @ApiPropertyOptional({ description: 'Título do anúncio', maxLength: 255, example: 'Vendo cartas raras de Pokemon - Atualizado' })
  titulo?: string;

  @ApiPropertyOptional({ description: 'Descrição detalhada do anúncio', example: 'Coleção atualizada de cartas raras' })
  descricao?: string;

  @ApiPropertyOptional({ description: 'Preço total do anúncio', minimum: 0, example: 200.00 })
  preco_total?: number;

  @ApiPropertyOptional({ description: 'Quantidade disponível', minimum: 1, example: 15 })
  quantidade_disponivel?: number;
}