import { IsString, IsNotEmpty, IsInt, IsEnum } from 'class-validator';

export class CreateComentarioDto {
  @IsInt()
  @IsNotEmpty()
  usuario_id: number;

  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsInt()
  @IsNotEmpty()
  entity_id: number;

  @IsString()
  @IsEnum(['anuncio_venda', 'anuncio_compra', 'leilao', 'proposta'])
  entity_type: 'anuncio_venda' | 'anuncio_compra' | 'leilao' | 'proposta';
}
