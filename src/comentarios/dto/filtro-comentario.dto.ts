import { IsOptional, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroComentarioDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  usuario_id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  entity_id?: number;

  @IsOptional()
  @IsString()
  @IsEnum(['anuncio_venda', 'anuncio_compra', 'leilao', 'proposta'])
  entity_type?: 'anuncio_venda' | 'anuncio_compra' | 'leilao' | 'proposta';

  @IsOptional()
  @IsString()
  @IsEnum(['ativo', 'deletado'])
  status?: 'ativo' | 'deletado';

  @IsOptional()
  @IsString()
  data_inicio?: string;

  @IsOptional()
  @IsString()
  data_fim?: string;

  // Paginação
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
