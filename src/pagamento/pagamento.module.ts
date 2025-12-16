import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';
import { Pedido } from '../carrinho/entities/pedido.entity';
import { PedidoItem } from '../carrinho/entities/pedidoItem.entity';
import { AnuncioVenda } from '../anunciosVenda/entities/anuncioVenda.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Pedido, PedidoItem, AnuncioVenda]),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
  exports: [PagamentoService],
})
export class PagamentoModule {}
