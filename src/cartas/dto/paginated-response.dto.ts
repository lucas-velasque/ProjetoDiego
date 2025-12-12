import { ApiProperty } from '@nestjs/swagger';

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

export class PaginatedCartasDto {
  @ApiProperty({ type: () => Object, isArray: true, description: 'Lista de cartas' })
  data: any[];

  @ApiProperty({ type: PaginationMetaDto, description: 'Metadados da paginação' })
  meta: PaginationMetaDto;
}