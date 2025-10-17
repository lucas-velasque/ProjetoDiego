import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
