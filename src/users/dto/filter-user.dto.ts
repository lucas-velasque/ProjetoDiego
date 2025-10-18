import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../user.model';

export class FilterUserDto {
  @ApiPropertyOptional({ description: 'Página atual', minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Itens por página', minimum: 1, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Buscar por nome de usuário' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ 
    description: 'Filtrar por papel do usuário', 
    enum: UserRole 
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ description: 'Filtrar por ID do nível' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  nivelUsuarioId?: number;

  @ApiPropertyOptional({ 
    description: 'Campo para ordenação', 
    enum: ['id', 'username', 'role', 'createdAt', 'updatedAt'],
    default: 'id'
  })
  @IsOptional()
  @IsString()
  orderBy?: string = 'id';

  @ApiPropertyOptional({ 
    description: 'Direção da ordenação', 
    enum: ['ASC', 'DESC'], 
    default: 'ASC' 
  })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'ASC';
}