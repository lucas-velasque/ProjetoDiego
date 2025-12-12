import { PartialType } from '@nestjs/mapped-types';
import { CreatePropostaDto } from './createProposta.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePropostaDto extends PartialType(CreatePropostaDto) {
  @ApiPropertyOptional({
    description: 'Valor proposto para a carta de Pokémon',
    minimum: 0,
    example: 200.00
  })
  valor_proposto?: number;

  @ApiPropertyOptional({
    description: 'Mensagem opcional para o vendedor',
    example: 'Posso aumentar minha oferta!'
  })
  mensagem?: string;
}