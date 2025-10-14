import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnuncioVenda } from './entities/anuncioVenda.entity';
import { AnuncioVendaCarta } from './entities/anuncioVendaCarta.entity';
import { CreateAnuncioVendaDto } from './dto/createAnuncioVenda.dto';
import { UpdateAnuncioVendaDto } from './dto/updateAnuncioVenda.dto';

@Injectable()
export class AnunciosVendaService {
  constructor(
    @InjectModel(AnuncioVenda)
    private anuncioVendaModel: typeof AnuncioVenda,
    @InjectModel(AnuncioVendaCarta)
    private anuncioVendaCartaModel: typeof AnuncioVendaCarta,
  ) {}

  async criar(dto: CreateAnuncioVendaDto, usuarioId: number) {
    // Criar o anúncio
    const anuncio = await this.anuncioVendaModel.create({
      usuario_id: usuarioId,
      titulo: dto.titulo,
      descricao: dto.descricao,
      preco_total: dto.preco_total,
      quantidade_disponivel: dto.quantidade_disponivel,
      status: 'ativo',
    });

    // Criar as cartas do anúncio
    if (dto.cartas && dto.cartas.length > 0) {
      const cartas = dto.cartas.map((carta) => ({
        anuncio_venda_id: anuncio.id,
        carta_id: carta.carta_id,
        quantidade: carta.quantidade,
        condicao: carta.condicao || 'Near Mint',
        observacoes: carta.observacoes,
      }));

      await this.anuncioVendaCartaModel.bulkCreate(cartas);
    }

    // Retornar anúncio com as cartas
    return this.buscarPorId(anuncio.id);
  }

  async listarTodos() {
    return this.anuncioVendaModel.findAll({
      include: [AnuncioVendaCarta],
      where: { status: 'ativo' },
    });
  }

  async buscarPorId(id: number) {
    const anuncio = await this.anuncioVendaModel.findByPk(id, {
      include: [AnuncioVendaCarta],
    });

    if (!anuncio) {
      throw new NotFoundException(`Anúncio com ID ${id} não encontrado`);
    }

    return anuncio;
  }

  async atualizar(id: number, dto: UpdateAnuncioVendaDto) {
    const anuncio = await this.buscarPorId(id);

    await anuncio.update({
      titulo: dto.titulo,
      descricao: dto.descricao,
      preco_total: dto.preco_total,
      quantidade_disponivel: dto.quantidade_disponivel,
    });

    return this.buscarPorId(id);
  }

  async deletar(id: number) {
    const anuncio = await this.buscarPorId(id);
    await anuncio.update({ status: 'cancelado' });
    return { message: 'Anúncio cancelado com sucesso' };
  }
}