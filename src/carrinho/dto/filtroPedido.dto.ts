import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { PaginacaoDto } from '../../common/dto/paginacao.dto';

export class FiltroPedidoDto extends PaginacaoDto {
  @IsOptional()
  @IsEnum(['pendente', 'pago', 'enviado', 'entregue', 'cancelado'])
  status?: string;

  @IsOptional()
  @IsDateString()
  data_inicio?: string;

  @IsOptional()
  @IsDateString()
  data_fim?: string;
}