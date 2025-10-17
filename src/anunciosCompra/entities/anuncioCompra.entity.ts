import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table({
  tableName: 'anuncios_compra',
  timestamps: true,
})
export class AnuncioCompra extends Model {
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

  @BelongsTo(() => User)
  declare usuario: User;

  // Atributos da carta procurada
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare nome_carta: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare expansao: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare numero_expansao: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare raridade: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare edicao: string;

  // Atributos do anúncio
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare quantidade: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  declare preco_maximo: number;

  @Column({
    type: DataType.ENUM('Mint', 'Near Mint', 'Excellent', 'Good', 'Light Played', 'Played', 'Poor'),
    allowNull: true,
  })
  declare condicao_minima: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare descricao: string;

  @Column({
    type: DataType.ENUM('ativo', 'fechado', 'cancelado'),
    allowNull: false,
    defaultValue: 'ativo',
  })
  declare status: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}