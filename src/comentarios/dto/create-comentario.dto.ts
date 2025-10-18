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

