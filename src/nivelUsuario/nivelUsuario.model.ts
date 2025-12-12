import { Table, Column, Model, DataType } from "sequelize-typescript";
import { HasMany } from "sequelize-typescript";
import { User } from "../users/user.model";

@Table({ tableName: "NivelUsuario" })
export class NivelUsuario extends Model<NivelUsuario> {
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
  declare nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare descricao: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare pontuacaoMinima?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare corIdentificacao?: string;

  @HasMany(() => User)
  usuario!: User[];
}
