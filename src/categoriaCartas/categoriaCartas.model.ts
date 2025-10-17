import { Table, Column, Model, DataType } from "sequelize-typescript";

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
}
