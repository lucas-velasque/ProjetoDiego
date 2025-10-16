import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'propostas',
  timestamps: true,
})
export class Proposta extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.ENUM('venda', 'compra'),
    allowNull: false,
  })
  declare anuncio_tipo: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare anuncio_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare usuario_id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare valor_proposto: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare mensagem: string;

  @Column({
    type: DataType.ENUM('pendente', 'aceita', 'recusada', 'cancelada'),
    allowNull: false,
    defaultValue: 'pendente',
  })
  declare status: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}