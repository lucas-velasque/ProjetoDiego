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
import { CategoriaCartas } from '../../categoriaCartas/categoriaCartas.model';

@Table({
  tableName: 'cartas',
  timestamps: true,
})
export class Carta extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare nome: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare descricao: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare tipo: string; // ex: Pokémon, Treinador, Energia

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare raridade: string; // ex: Comum, Incomum, Rara, Ultra Rara

  @ForeignKey(() => CategoriaCartas)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare categoria_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare pontos_saude: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare custo_mana: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare elemento: string; // ex: Fogo, Água, Planta, Elétrico

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare expansao: string; // ex: Base Set, Jungle, Fossil

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare numero_colecao: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare imagem_url: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  declare preco_medio: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Relacionamento com categoria
  @BelongsTo(() => CategoriaCartas)
  declare categoria: CategoriaCartas;
}
