import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Carta } from './entities/carta.entity';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
<<<<<<< HEAD
import { FiltroCartaDto } from './dto/filtro-carta.dto';
import { CategoriaCartas } from '../categoriaCartas/categoriaCartas.model';
=======
import { FilterCartaDto } from './dto/filter-carta.dto';
import { PaginatedCartasDto } from './dto/paginated-response.dto';
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036

@Injectable()
export class CartasService {
  constructor(
    @InjectModel(Carta)
    private cartaModel: typeof Carta,
  ) {}

  async create(createCartaDto: CreateCartaDto): Promise<Carta> {
<<<<<<< HEAD
    const carta = await this.cartaModel.create(createCartaDto as any);
    return await this.findOne(carta.id);
  }

  async findAll(filtros: FiltroCartaDto = {}) {
    const { page = 1, limit = 10, ...filters } = filtros;
    const offset = (page - 1) * limit;

    const whereClause: any = {};

    // Filtro por nome
    if (filters.nome) {
      whereClause.nome = { [Op.iLike]: `%${filters.nome}%` };
    }

    // Filtro por tipo
    if (filters.tipo) {
      whereClause.tipo = { [Op.iLike]: `%${filters.tipo}%` };
    }

    // Filtro por raridade
    if (filters.raridade) {
      whereClause.raridade = filters.raridade;
    }

    // Filtro por categoria
    if (filters.categoria_id) {
      whereClause.categoria_id = filters.categoria_id;
    }

    // Filtro por elemento
    if (filters.elemento) {
      whereClause.elemento = filters.elemento;
    }

    // Filtro por expansão
    if (filters.expansao) {
      whereClause.expansao = { [Op.iLike]: `%${filters.expansao}%` };
    }

    // Filtro por pontos de saúde
    if (filters.pontos_saude_min !== undefined || filters.pontos_saude_max !== undefined) {
      whereClause.pontos_saude = {};
      if (filters.pontos_saude_min !== undefined) {
        whereClause.pontos_saude[Op.gte] = filters.pontos_saude_min;
      }
      if (filters.pontos_saude_max !== undefined) {
        whereClause.pontos_saude[Op.lte] = filters.pontos_saude_max;
      }
    }

    // Filtro por custo de mana
    if (filters.custo_mana_min !== undefined || filters.custo_mana_max !== undefined) {
      whereClause.custo_mana = {};
      if (filters.custo_mana_min !== undefined) {
        whereClause.custo_mana[Op.gte] = filters.custo_mana_min;
      }
      if (filters.custo_mana_max !== undefined) {
        whereClause.custo_mana[Op.lte] = filters.custo_mana_max;
      }
    }

    // Filtro por preço médio
    if (filters.preco_min !== undefined || filters.preco_max !== undefined) {
      whereClause.preco_medio = {};
      if (filters.preco_min !== undefined) {
        whereClause.preco_medio[Op.gte] = filters.preco_min;
      }
      if (filters.preco_max !== undefined) {
        whereClause.preco_medio[Op.lte] = filters.preco_max;
      }
    }

    // Filtro por data
    if (filters.data_inicio || filters.data_fim) {
      whereClause.created_at = {};
      if (filters.data_inicio) {
        whereClause.created_at[Op.gte] = new Date(filters.data_inicio);
      }
      if (filters.data_fim) {
        whereClause.created_at[Op.lte] = new Date(filters.data_fim);
      }
    }

    const { count, rows } = await this.cartaModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: CategoriaCartas,
          as: 'categoria',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
=======
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
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
      },
    };
  }

  async findOne(id: number): Promise<Carta> {
<<<<<<< HEAD
    const carta = await this.cartaModel.findByPk(id, {
      include: [
        {
          model: CategoriaCartas,
          as: 'categoria',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
    });

    if (!carta) {
      throw new NotFoundException(`Carta com ID ${id} não encontrada`);
    }

=======
    const carta = await this.cartaModel.findByPk(id);
    if (!carta) throw new NotFoundException('Carta não encontrada');
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
    return carta;
  }

  async update(id: number, updateCartaDto: UpdateCartaDto): Promise<Carta> {
<<<<<<< HEAD
    const carta = await this.cartaModel.findByPk(id);

    if (!carta) {
      throw new NotFoundException(`Carta com ID ${id} não encontrada`);
    }

    await carta.update(updateCartaDto);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const carta = await this.cartaModel.findByPk(id);

    if (!carta) {
      throw new NotFoundException(`Carta com ID ${id} não encontrada`);
    }

    await carta.destroy();

    return { message: 'Carta removida com sucesso' };
=======
    const carta = await this.findOne(id);
    return carta.update(updateCartaDto);
  }

  async remove(id: number): Promise<void> {
    const carta = await this.findOne(id);
    await carta.destroy();
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }
}