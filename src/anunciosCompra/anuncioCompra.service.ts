import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnuncioCompra } from './entities/anuncioCompra.entity';
import { CreateAnuncioCompraDto } from './dto/createAnuncioCompra.dto';
import { UpdateAnuncioCompraDto } from './dto/updateAnuncioCompra.dto';

@Injectable()
export class AnunciosCompraService {
  constructor(
    @InjectModel(AnuncioCompra)
    private anuncioCompraModel: typeof AnuncioCompra,
  ) {}

  async criar(dto: CreateAnuncioCompraDto, usuarioId: number) {
    const anuncio = await this.anuncioCompraModel.create({
      usuario_id: usuarioId,
      nome_carta: dto.nome_carta,
      expansao: dto.expansao,
      numero_expansao: dto.numero_expansao,
      raridade: dto.raridade,
      edicao: dto.edicao,
      quantidade: dto.quantidade,
      preco_maximo: dto.preco_maximo,
      condicao_minima: dto.condicao_minima,
      descricao: dto.descricao,
      status: 'ativo',
    });

    return anuncio;
  }

  async listarTodos() {
    return this.anuncioCompraModel.findAll({
      where: { status: 'ativo' },
      order: [['created_at', 'DESC']],
    });
  }

  async buscarPorId(id: number) {
    const anuncio = await this.anuncioCompraModel.findByPk(id);

    if (!anuncio) {
      throw new NotFoundException(`Anúncio de compra com ID ${id} não encontrado`);
    }

    return anuncio;
  }

  async atualizar(id: number, dto: UpdateAnuncioCompraDto) {
    const anuncio = await this.buscarPorId(id);

    await anuncio.update({
      nome_carta: dto.nome_carta,
      expansao: dto.expansao,
      numero_expansao: dto.numero_expansao,
      raridade: dto.raridade,
      edicao: dto.edicao,
      quantidade: dto.quantidade,
      preco_maximo: dto.preco_maximo,
      condicao_minima: dto.condicao_minima,
      descricao: dto.descricao,
    });

    return this.buscarPorId(id);
  }

  async deletar(id: number) {
    const anuncio = await this.buscarPorId(id);
    await anuncio.update({ status: 'cancelado' });
    return { message: 'Anúncio de compra cancelado com sucesso' };
  }
}