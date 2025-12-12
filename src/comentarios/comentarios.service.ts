import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
<<<<<<< HEAD
import { Op } from 'sequelize';
import { Comentario } from './entities/comentario.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { FiltroComentarioDto } from './dto/filtro-comentario.dto';
import { User } from '../users/entities/user.entity';
=======
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario)
    private comentarioModel: typeof Comentario,
  ) {}

<<<<<<< HEAD
  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const comentario = await this.comentarioModel.create(createComentarioDto as any);
    return await this.findOne(comentario.id);
  }

  async findAll(filtros: FiltroComentarioDto = {}) {
    const { page = 1, limit = 10, ...filters } = filtros;
    const offset = (page - 1) * limit;

    const whereClause: any = { status: 'ativo' }; // Por padrão, só retorna comentários ativos

    // Filtro por usuário
    if (filters.usuario_id) {
      whereClause.usuario_id = filters.usuario_id;
    }

    // Filtro por entidade
    if (filters.entity_id) {
      whereClause.entity_id = filters.entity_id;
    }

    // Filtro por tipo de entidade
    if (filters.entity_type) {
      whereClause.entity_type = filters.entity_type;
    }

    // Filtro por status
    if (filters.status) {
      whereClause.status = filters.status;
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

    const { count, rows } = await this.comentarioModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'usuario',
          attributes: ['id', 'nome', 'username'],
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
      },
    };
  }

  async findOne(id: number): Promise<Comentario> {
    const comentario = await this.comentarioModel.findByPk(id, {
      include: [
        {
          model: User,
          as: 'usuario',
          attributes: ['id', 'nome', 'username'],
        },
      ],
    });

    if (!comentario) {
      throw new NotFoundException(`Comentário com ID ${id} não encontrado`);
    }

    return comentario;
  }

  async findByEntity(entityId: number, entityType: string) {
    return await this.comentarioModel.findAll({
      where: {
        entity_id: entityId,
        entity_type: entityType,
        status: 'ativo',
      },
      include: [
        {
          model: User,
          as: 'usuario',
          attributes: ['id', 'nome', 'username'],
        },
      ],
      order: [['created_at', 'DESC']],
    });
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto): Promise<Comentario> {
    const comentario = await this.comentarioModel.findByPk(id);

    if (!comentario) {
      throw new NotFoundException(`Comentário com ID ${id} não encontrado`);
    }

    await comentario.update(updateComentarioDto);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const comentario = await this.comentarioModel.findByPk(id);

    if (!comentario) {
      throw new NotFoundException(`Comentário com ID ${id} não encontrado`);
    }

    // Soft delete
    await comentario.update({ status: 'deletado' });

    return { message: 'Comentário removido com sucesso' };
=======
  async create(createComentarioDto: CreateComentarioDto, usuarioId: number): Promise<Comentario> {
    // Adiciona o usuarioId extraído do JWT ao objeto de criação
    return this.comentarioModel.create({
      ...createComentarioDto,
      usuarioId
    } as any);
  }

  async findAll(): Promise<Comentario[]> {
    return this.comentarioModel.findAll();
  }

  async findOne(id: number): Promise<Comentario> {
    const comentario = await this.comentarioModel.findByPk(id);
    if (!comentario) {
      throw new NotFoundException(`Comentário com ID ${id} não encontrado.`);
    }
    return comentario;
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto): Promise<Comentario> {
    const [numberOfAffectedRows, [updatedComentario]] = await this.comentarioModel.update(
      { ...updateComentarioDto },
      { where: { id }, returning: true },
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Comentário com ID ${id} não encontrado.`);
    }

    return updatedComentario;
  }

  async remove(id: number): Promise<void> {
    const numberOfDeletedRows = await this.comentarioModel.destroy({ where: { id } });

    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`Comentário com ID ${id} não encontrado.`);
    }
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }
}

