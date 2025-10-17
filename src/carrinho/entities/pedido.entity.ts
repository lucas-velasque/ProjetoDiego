import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { PedidoItem } from './pedidoItem.entity';

@Table({
  tableName: 'pedidos',
  timestamps: true,
})
export class Pedido extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare usuario_id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare valor_total: number;

  @Column({
    type: DataType.ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado'),
    allowNull: false,
    defaultValue: 'pendente',
  })
  declare status: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Relacionamento
  @HasMany(() => PedidoItem, {
    foreignKey: 'pedido_id',
    as: 'itens',
  })
  declare itens: PedidoItem[];
}