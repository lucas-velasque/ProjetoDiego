import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Carta } from './entities/carta.entity';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
import { FilterCartaDto } from './dto/filter-carta.dto';
import { PaginatedCartasDto } from './dto/paginated-response.dto';

@Injectable()
export class CartasService {
  constructor(
    @InjectModel(Carta)
    private cartaModel: typeof Carta,
  ) {}

  async create(createCartaDto: CreateCartaDto): Promise<Carta> {
    return this.cartaModel.create(createCartaDto as any);
  }

  async findAll(filterDto: FilterCartaDto): Promise<PaginatedCartasDto> {
    const { page = 1, limit = 10, orderBy = 'id', order = 'ASC', ...filters } = filterDto;
    
    const offset = (page - 1) * limit;
    
    // Construir filtros dinâmicos
    const where: any = {};
    
    if (filters.nome) {
      where.nome = { [Op.iLike]: `%${filters.nome}%` };
    }
    
    if (filters.tipo) {
      where.tipo = { [Op.iLike]: `%${filters.tipo}%` };
    }
    
    if (filters.categoria) {
      where.categoria = { [Op.iLike]: `%${filters.categoria}%` };
    }
    
    if (filters.raridade) {
      where.raridade = { [Op.iLike]: `%${filters.raridade}%` };
    }
    
    if (filters.simboloExpansao) {
      where.simboloExpansao = { [Op.iLike]: `%${filters.simboloExpansao}%` };
    }
    
    if (filters.ilustrador) {
      where.ilustrador = { [Op.iLike]: `%${filters.ilustrador}%` };
    }

    // Buscar cartas com filtros e paginação
    const { rows: data, count: totalItems } = await this.cartaModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, order]],
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  }

  async findOne(id: number): Promise<Carta> {
    const carta = await this.cartaModel.findByPk(id);
    if (!carta) throw new NotFoundException('Carta não encontrada');
    return carta;
  }

  async update(id: number, updateCartaDto: UpdateCartaDto): Promise<Carta> {
    const carta = await this.findOne(id);
    return carta.update(updateCartaDto);
  }

  async remove(id: number): Promise<void> {
    const carta = await this.findOne(id);
    await carta.destroy();
  }
}