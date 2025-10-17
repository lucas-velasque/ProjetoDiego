import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
//tava com erro de nome de import aqui também
import { Carta } from "src/cartas/entities/carta.entity";

@Table({ tableName: "categoria_cartas" })
export class CategoriaCartas extends Model<CategoriaCartas> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  descricao: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tipo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @HasMany(() => Carta)
  cartas: Carta[];
}
