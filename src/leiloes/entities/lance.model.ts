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

@Table({ tableName: "lances", timestamps: true })
export class Lance extends Model<Lance> {
  @PrimaryKey
  @Default(() => uuid())
  @Column(DataType.UUID)
  declare id: number;

  @ForeignKey(() => Leilao)
  @Column(DataType.UUID)
  id_leilao!: number;

  @BelongsTo(() => Leilao)
  leilao!: Leilao;

  // usuário que deu o lance (JWT payload.sub)
  @Column(DataType.STRING) id_usuario!: number;
  @Column(DataType.DECIMAL(12, 2)) valor!: number;
}
