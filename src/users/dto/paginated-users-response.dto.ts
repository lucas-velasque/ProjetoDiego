import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.model';

export class PaginationMetaDto {
  @ApiProperty({ description: 'Página atual' })
  currentPage: number;

  @ApiProperty({ description: 'Itens por página' })
  itemsPerPage: number;

  @ApiProperty({ description: 'Total de itens' })
  totalItems: number;

  @ApiProperty({ description: 'Total de páginas' })
  totalPages: number;

  @ApiProperty({ description: 'Há página anterior' })
  hasPreviousPage: boolean;

  @ApiProperty({ description: 'Há próxima página' })
  hasNextPage: boolean;
}

export class PaginatedUsersDto {
  @ApiProperty({ 
    type: () => User, 
    isArray: true, 
    description: 'Lista de usuários' 
  })
  data: User[];

  @ApiProperty({ 
    type: PaginationMetaDto, 
    description: 'Metadados da paginação' 
  })
  meta: PaginationMetaDto;
}