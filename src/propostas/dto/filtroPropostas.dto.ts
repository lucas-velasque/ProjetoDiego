import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginacaoDto } from '../../common/dto/paginacao.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FiltroPropostaDto extends PaginacaoDto {
  @ApiPropertyOptional({
    description: 'Valor mínimo das propostas',
    example: 100
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_min?: number;

  @ApiPropertyOptional({
    description: 'Valor máximo das propostas',
    example: 500
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_max?: number;

  @ApiPropertyOptional({
    description: 'Status da proposta',
    enum: ['pendente', 'aceita', 'recusada', 'cancelada'],
    example: 'pendente'
  })
  @IsOptional()
  @IsEnum(['pendente', 'aceita', 'recusada', 'cancelada'])
  status?: string;
}