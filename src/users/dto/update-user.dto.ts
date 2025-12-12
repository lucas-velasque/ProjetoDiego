import { IsString, IsEmail, IsOptional, MinLength, IsInt, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha?: string;

  @IsOptional()
  @IsInt()
  nivel_usuario_id?: number;

  @IsOptional()
  @IsInt()
  pontuacao?: number;

  @IsOptional()
  @IsEnum(['ativo', 'inativo', 'bloqueado'])
  status?: 'ativo' | 'inativo' | 'bloqueado';
}
