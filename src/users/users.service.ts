import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FiltroUserDto } from './dto/filtro-user.dto';
import { NivelUsuario } from '../nivelUsuario/nivelUsuario.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

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

    // Hash da senha (se fornecida)
    let hashedPassword = '';
    if (createUserDto.senha) {
      hashedPassword = await bcrypt.hash(createUserDto.senha, 10);
    }

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

  async findOneByClerkId(clerkId: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { clerk_id: clerkId },
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
  }

}
