import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { CategoriaCartas } from 'src/categoriaCartas/categoriaCartas.model';
import { AnuncioVendaCarta } from 'src/anunciosVenda/entities/anuncioVendaCarta.entity';

@Table({ tableName: 'cartas' })
export class Carta extends Model<Carta> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tipo: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pontosSaude: number;

  @Column({
    type: DataType.STRING,
  })
  categoria: string;

  @Column({
    type: DataType.TEXT,
  })
  descricaoPokedex: string;

  @Column({
    type: DataType.INTEGER,
  })
  danoCausado: number;

  @Column({
    type: DataType.STRING,
  })
  ataque: string;

  @Column({
    type: DataType.STRING,
  })
  custoAtaque: string;

  @Column({
    type: DataType.TEXT,
  })
  efeitosAtaque: string;

  @Column({
    type: DataType.STRING,
  })
  ilustrador: string;

  @Column({
    type: DataType.STRING,
  })
  simboloExpansao: string;

  @Column({
    type: DataType.STRING,
  })
  numeroExpansao: string;

  @Column({
    type: DataType.STRING,
  })
  raridade: string;

  @Column({
    type: DataType.STRING,
  })
  fraqueza: string;

  @Column({
    type: DataType.STRING,
  })
  resistencia: string;

  @Column({
    type: DataType.STRING,
  })
  custoRecuo: string;

  @Column({
    type: DataType.TEXT,
  })
  descricaoNaPokedex: string;

  @ForeignKey(() => CategoriaCartas)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  categoriaId: number;

  @BelongsTo(() => CategoriaCartas)
  categoria_relacionamento: CategoriaCartas;

  @HasMany(() => AnuncioVendaCarta, {
    foreignKey: 'carta_id',
    as: 'anunciosVenda',
  })
  anunciosVenda: AnuncioVendaCarta[];
}
