import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from '../comentario.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario)
    private comentarioModel: typeof Comentario,
  ) {}

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    return this.comentarioModel.create({ ...createComentarioDto });
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
  }
}

