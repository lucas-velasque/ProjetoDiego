import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import { Leilao } from "./leilao.model";
import { User } from "src/users/user.model";

@Table({ tableName: "lances", timestamps: true })
export class Lance extends Model<Lance> {
  @PrimaryKey
  @Default(() => uuid())
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Leilao)
  @Column(DataType.UUID)
  id_leilao!: string;

  @BelongsTo(() => Leilao)
  leilao!: Leilao;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_usuario!: number;

  @BelongsTo(() => User)
  usuario!: User;

  @Column(DataType.DECIMAL(12, 2)) valor!: number;
}
