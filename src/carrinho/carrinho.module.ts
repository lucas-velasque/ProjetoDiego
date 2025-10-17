import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarrinhoController } from './carrinho.controller';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoItem } from './entities/carrinhoItem.entity';
import { Pedido } from './entities/pedido.entity';
import { PedidoItem } from './entities/pedidoItem.entity';
import { AnuncioVenda } from '../anunciosVenda/entities/anuncioVenda.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      CarrinhoItem,
      Pedido,
      PedidoItem,
      AnuncioVenda,
    ]),
  ],
  controllers: [CarrinhoController],
  providers: [CarrinhoService],
  exports: [CarrinhoService],
})
export class CarrinhoModule {}