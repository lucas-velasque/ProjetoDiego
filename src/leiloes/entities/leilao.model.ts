import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  HasMany,
} from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import { Lance } from "./lance.model";

@Table({ tableName: "leiloes", timestamps: true })
export class Leilao extends Model<Leilao> {
  @PrimaryKey
  @Default(() => uuid())
  @Column(DataType.UUID)
  declare id: number;

  @Column(DataType.STRING) titulo!: string;
  @Column(DataType.TEXT) descricao?: string;

  @Column(DataType.DECIMAL(12, 2)) precoInicial!: number;
  @Column(DataType.DECIMAL(12, 2)) precoAtual!: number;

  @Column(DataType.DATE) terminaEm!: Date;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) ativo!: boolean;

  // vindo do JWT (payload.sub)
  @Column(DataType.STRING) id_leilao!: string;

  @HasMany(() => Lance) lances!: Lance[];
  id_usuario: number;
  vendedorId: string;
}
