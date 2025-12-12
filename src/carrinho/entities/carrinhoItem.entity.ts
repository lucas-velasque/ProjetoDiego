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
import { AnuncioVenda } from '../../anunciosVenda/entities/anuncioVenda.entity';

@Table({
  tableName: 'carrinho_itens',
  timestamps: true,
})
export class CarrinhoItem extends Model {
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

  @ForeignKey(() => AnuncioVenda)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare anuncio_venda_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare quantidade: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Relacionamento
  @BelongsTo(() => AnuncioVenda, {
    foreignKey: 'anuncio_venda_id',
    as: 'anuncio',
  })
  declare anuncio: AnuncioVenda;
}