import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, Max, IsOptional } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  texto: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  avaliacao?: number;

  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @IsNumber()
  @IsNotEmpty()
  produtoId: number;
}

