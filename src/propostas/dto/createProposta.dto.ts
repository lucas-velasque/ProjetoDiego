import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreatePropostaDto {
  @IsNumber()
  @Min(0)
  valor_proposto: number;

  @IsString()
  @IsOptional()
  mensagem?: string;
}