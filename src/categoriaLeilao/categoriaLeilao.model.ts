import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
//erro de nome de import aqui 
import { Leilao } from "src/leiloes/entities/leilao.model";

@Table({ tableName: "categoria_leilao" })
export class CategoriaLeilao extends Model<CategoriaLeilao> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @HasMany(() => Leilao)
  leiloes: Leilao[];
}
