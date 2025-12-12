<<<<<<< HEAD
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
  @IsNotEmpty()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha: string;

  @IsOptional()
  @IsInt()
  nivel_usuario_id?: number;
}
=======
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
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
