import { AnuncioVendaCarta } from './anuncioVendaCarta.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'anuncios_venda',
  timestamps: true,
})
export class AnuncioVenda extends Model {
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
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare titulo: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare descricao: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare preco_total: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare quantidade_disponivel: number;

  @Column({
    type: DataType.ENUM('ativo', 'vendido', 'cancelado'),
    allowNull: false,
    defaultValue: 'ativo',
  })
  declare status: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Relacionamento com as cartas do anúncio 
  @HasMany(() => AnuncioVendaCarta, {
    foreignKey: 'anuncio_venda_id',
    as: 'cartas',
  })
  declare cartas: AnuncioVendaCarta[];
}