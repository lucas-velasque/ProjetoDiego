import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginacaoDto } from '../../common/dto/paginacao.dto';

export class FiltroPropostaDto extends PaginacaoDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_min?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor_max?: number;

  @IsOptional()
  @IsEnum(['pendente', 'aceita', 'recusada', 'cancelada'])
  status?: string;
}