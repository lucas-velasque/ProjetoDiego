import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { PaginatedUsersDto } from './dto/paginated-users-response.dto';
import { NivelUsuario } from 'src/nivelUsuario/nivelUsuario.model';

export type UserType = User;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ where: { username } });
    return user === null ? undefined : user;
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