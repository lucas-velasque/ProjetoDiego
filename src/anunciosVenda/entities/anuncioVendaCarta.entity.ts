import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
} from 'sequelize-typescript';
import { AnuncioVenda } from './anuncioVenda.entity';
import { Carta } from 'src/cartas/entities/carta.entity';

@Table({
  tableName: 'anuncios_venda_cartas',
  timestamps: true,
  updatedAt: false,
})
export class AnuncioVendaCarta extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => AnuncioVenda)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare anuncio_venda_id: number;

  // Relacionamento com Carta: cada entrada refere-se a uma carta específica
  @ForeignKey(() => Carta)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare carta_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare quantidade: number;

  @Column({
    type: DataType.ENUM('Mint', 'Near Mint', 'Excellent', 'Good', 'Light Played', 'Played', 'Poor'),
    allowNull: false,
    defaultValue: 'Near Mint',
  })
  declare condicao: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare observacoes: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare foto_url: string;

  @CreatedAt
  declare created_at: Date;

  // Relacionamento
  @BelongsTo(() => AnuncioVenda, {
    foreignKey: 'anuncio_venda_id',
    as: 'anuncio',
  })
  declare anuncio: AnuncioVenda;

  @BelongsTo(() => Carta, {
    foreignKey: 'carta_id',
    as: 'carta',
  })
  declare carta: Carta;
}