import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Carta } from './entities/carta.entity';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';

@Injectable()
export class CartasService {
  constructor(
    @InjectModel(Carta)
    private cartaModel: typeof Carta,
  ) {}

  async create(createCartaDto: CreateCartaDto): Promise<Carta> {
    return this.cartaModel.create(createCartaDto as any);
  }

  async findAll(): Promise<Carta[]> {
    return this.cartaModel.findAll();
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
