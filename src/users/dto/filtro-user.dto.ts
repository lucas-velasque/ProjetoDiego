import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroUserDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(['ativo', 'inativo', 'bloqueado'])
  status?: 'ativo' | 'inativo' | 'bloqueado';

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nivel_usuario_id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pontuacao_min?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pontuacao_max?: number;

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
