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

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'stripe_session_id',
  })
  declare stripe_session_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'stripe_payment_intent_id',
  })
  declare stripe_payment_intent_id: string;

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
