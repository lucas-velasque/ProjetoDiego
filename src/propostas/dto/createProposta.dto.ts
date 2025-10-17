import { IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePropostaDto {
  @ApiProperty({
    description: 'Valor proposto para a carta de Pokémon',
    minimum: 0,
    example: 150.50
  })
  @IsNumber()
  @Min(0)
  valor_proposto: number;

  @ApiPropertyOptional({
    description: 'Mensagem opcional para o vendedor',
    example: 'Estou muito interessado nesta carta!'
  })
  @IsString()
  @IsOptional()
  mensagem?: string;
}