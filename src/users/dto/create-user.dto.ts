import { IsString, IsEnum, IsOptional, MinLength, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../user.model';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'Nome de usuário único', 
    example: 'joao_silva',
    minLength: 3 
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ 
    description: 'Senha do usuário', 
    example: 'senha123',
    minLength: 6 
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ 
    description: 'Papel do usuário no sistema', 
    enum: UserRole,
    default: UserRole.USER,
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