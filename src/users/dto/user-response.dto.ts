import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.model';

export class UserResponseDto {
  @ApiProperty({ description: 'ID do usuário', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome de usuário', example: 'joao_silva' })
  username: string;

  @ApiProperty({ 
    description: 'Papel do usuário', 
    enum: UserRole, 
    example: UserRole.USER 
  })
  role: UserRole;

  @ApiProperty({ description: 'ID do nível do usuário', example: 1, nullable: true })
  nivelUsuarioId: number | null;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}