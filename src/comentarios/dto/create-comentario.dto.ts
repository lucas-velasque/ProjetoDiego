<<<<<<< HEAD
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
=======
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComentarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty({ description: 'Conteúdo do comentário', example: 'Ótima carta!', maxLength: 500 })
  texto: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  @ApiProperty({ description: 'Avaliação do comentário (1 a 5 estrelas)', example: 5, minimum: 1, maximum: 5, required: false })
  avaliacao?: number;

  // REMOVIDO: usuarioId não deve vir do body por questões de segurança
  // O ID do usuário será extraído do token JWT automaticamente

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID da carta a ser comentada', example: 1 })
  cartaId: number;
}

>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
