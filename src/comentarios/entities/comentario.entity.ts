import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table({
  tableName: 'comentarios',
  timestamps: true,
})
export class Comentario extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare usuario_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare texto: string;

  // Relacionamento polymorphic - pode comentar em diferentes entidades
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare entity_id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare entity_type: string; // ex: 'anuncio_venda', 'anuncio_compra', 'leilao', 'proposta'

  @Column({
    type: DataType.ENUM('ativo', 'deletado'),
    allowNull: false,
    defaultValue: 'ativo',
  })
  declare status: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Relacionamento com User
  @BelongsTo(() => User)
  declare usuario: User;
}
