import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha?: string;

  @IsOptional()
  @IsString()
  clerk_id?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password deve ter no mínimo 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsInt()
  nivel_usuario_id?: number | null;

  @IsOptional()
  @IsString()
  status?: string;
}
