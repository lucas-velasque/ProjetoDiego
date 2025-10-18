import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
} from 'sequelize-typescript';
import { Pedido } from './pedido.entity';
import { AnuncioVenda } from '../../anunciosVenda/entities/anuncioVenda.entity';

@Table({
  tableName: 'pedidos_itens',
  timestamps: true,
  updatedAt: false,
})
export class PedidoItem extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Pedido)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare pedido_id: number;

  @ForeignKey(() => AnuncioVenda)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare anuncio_venda_id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare preco_unitario: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare quantidade: number;

  @CreatedAt
  declare created_at: Date;

  // Relacionamentos
  @BelongsTo(() => Pedido, {
    foreignKey: 'pedido_id',
    as: 'pedido',
  })
  declare pedido: Pedido;

  @BelongsTo(() => AnuncioVenda, {
    foreignKey: 'anuncio_venda_id',
    as: 'anuncio',
  })
  declare anuncio: AnuncioVenda;
}