import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
<<<<<<< HEAD
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FiltroUserDto } from './dto/filtro-user.dto';
import { NivelUsuario } from '../nivel-usuario/nivelUsuario.model';
=======
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { PaginatedUsersDto } from './dto/paginated-users-response.dto';
import { NivelUsuario } from 'src/nivelUsuario/nivelUsuario.model';

export type UserType = User;
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

<<<<<<< HEAD
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar se email já existe
    const emailExists = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (emailExists) {
      throw new ConflictException('Email já cadastrado');
    }

    // Verificar se username já existe
    const usernameExists = await this.userModel.findOne({
      where: { username: createUserDto.username },
    });
    if (usernameExists) {
      throw new ConflictException('Username já cadastrado');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);

    // Criar usuário
    const user = await this.userModel.create({
      ...createUserDto,
      senha: hashedPassword,
    });

    return user;
  }

  async findAll(filtros: FiltroUserDto = {}) {
    const { page = 1, limit = 10, ...filters } = filtros;
    const offset = (page - 1) * limit;

    const whereClause: any = {};

    // Filtros
    if (filters.nome) {
      whereClause.nome = { [Op.iLike]: `%${filters.nome}%` };
    }

    if (filters.username) {
      whereClause.username = { [Op.iLike]: `%${filters.username}%` };
    }

    if (filters.email) {
      whereClause.email = { [Op.iLike]: `%${filters.email}%` };
    }

    if (filters.status) {
      whereClause.status = filters.status;
    }

    if (filters.nivel_usuario_id) {
      whereClause.nivel_usuario_id = filters.nivel_usuario_id;
    }

    if (filters.pontuacao_min !== undefined || filters.pontuacao_max !== undefined) {
      whereClause.pontuacao = {};
      if (filters.pontuacao_min !== undefined) {
        whereClause.pontuacao[Op.gte] = filters.pontuacao_min;
      }
      if (filters.pontuacao_max !== undefined) {
        whereClause.pontuacao[Op.lte] = filters.pontuacao_max;
      }
    }

    // Filtro de data
    if (filters.data_inicio || filters.data_fim) {
      whereClause.created_at = {};
      if (filters.data_inicio) {
        whereClause.created_at[Op.gte] = new Date(filters.data_inicio);
      }
      if (filters.data_fim) {
        whereClause.created_at[Op.lte] = new Date(filters.data_fim);
      }
    }

    const { count, rows } = await this.userModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: NivelUsuario,
          as: 'nivelUsuario',
          attributes: ['id', 'nome', 'descricao', 'pontuacaoMinima'],
        },
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['senha'] }, // Não retornar senha
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

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: NivelUsuario,
          as: 'nivelUsuario',
          attributes: ['id', 'nome', 'descricao', 'pontuacaoMinima'],
        },
      ],
      attributes: { exclude: ['senha'] }, // Não retornar senha
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { username },
      include: [
        {
          model: NivelUsuario,
          as: 'nivelUsuario',
        },
      ],
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { email },
      include: [
        {
          model: NivelUsuario,
          as: 'nivelUsuario',
        },
      ],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Verificar conflitos de email
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.userModel.findOne({
        where: { email: updateUserDto.email, id: { [Op.ne]: id } },
      });
      if (emailExists) {
        throw new ConflictException('Email já cadastrado');
      }
    }

    // Verificar conflitos de username
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const usernameExists = await this.userModel.findOne({
        where: { username: updateUserDto.username, id: { [Op.ne]: id } },
      });
      if (usernameExists) {
        throw new ConflictException('Username já cadastrado');
      }
    }

    // Se senha foi fornecida, fazer hash
    if (updateUserDto.senha) {
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, 10);
    }

    await user.update(updateUserDto);

    // Retornar usuário atualizado sem senha
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Soft delete - marcar como inativo
    await user.update({ status: 'inativo' });

    return { message: 'Usuário desativado com sucesso' };
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
=======
  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ where: { username } });
    return user === null ? undefined : user;
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar se o username já existe
    const existingUser = await this.findOne(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Nome de usuário já está em uso');
    }

    return this.userModel.create(createUserDto as any);
  }

  async findAll(filterDto: FilterUserDto): Promise<PaginatedUsersDto> {
    const { 
      page = 1, 
      limit = 10, 
      orderBy = 'id', 
      order = 'ASC', 
      ...filters 
    } = filterDto;
    
    const offset = (page - 1) * limit;
    
    // Construir filtros dinâmicos
    const where: any = {};
    
    if (filters.username) {
      where.username = { [Op.iLike]: `%${filters.username}%` };
    }
    
    if (filters.role) {
      where.role = filters.role;
    }
    
    if (filters.nivelUsuarioId) {
      where.nivelUsuarioId = filters.nivelUsuarioId;
    }

    // Buscar usuários com filtros e paginação
    const { rows: data, count: totalItems } = await this.userModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, order]],
      attributes: { exclude: ['password'] }, // Excluir senha da resposta
      include: [
        {
          model: NivelUsuario,
          as: 'nivel',
          required: false,
        }
      ]
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

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] }, // Excluir senha da resposta
      include: [
        {
          model: NivelUsuario,
          as: 'nivel',
          required: false,
        }
      ]
    });
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Verificar se o novo username já existe (se estiver sendo alterado)
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findOne(updateUserDto.username);
      if (existingUser) {
        throw new ConflictException('Nome de usuário já está em uso');
      }
    }

    await user.update(updateUserDto);
    
    // Retornar usuário atualizado sem a senha
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    
    await user.destroy();
  }
}