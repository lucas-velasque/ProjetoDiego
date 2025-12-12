<<<<<<< HEAD
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
=======
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, MinLength, IsInt } from 'class-validator';
import { UserRole } from '../user.model';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ 
    description: 'Nome de usuário único', 
    example: 'joao_silva',
    minLength: 3 
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @ApiPropertyOptional({ 
    description: 'Senha do usuário', 
    example: 'novaSenha123',
    minLength: 6 
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ 
    description: 'Papel do usuário no sistema', 
    enum: UserRole,
    example: UserRole.USER
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ 
    description: 'ID do nível do usuário', 
    example: 1 
  })
  @IsOptional()
  @IsInt()
  nivelUsuarioId?: number;
}
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
