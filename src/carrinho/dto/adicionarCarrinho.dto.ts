import { IsNumber, Min } from 'class-validator';

export class AdicionarCarrinhoDto {
  @IsNumber()
  anuncio_venda_id: number;

  @IsNumber()
  @Min(1)
  quantidade: number;
}