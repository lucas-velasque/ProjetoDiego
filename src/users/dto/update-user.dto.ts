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