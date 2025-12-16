import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import { Lance } from "./lance.model";
import { User } from "src/users/user.model";
import { CategoriaLeilao } from "src/categoriaLeilao/categoriaLeilao.model";

@Table({ tableName: "leiloes", timestamps: true })
export class Leilao extends Model<Leilao> {
  @PrimaryKey
  @Default(() => uuid())
  @Column(DataType.UUID)
  declare id: string;

  @Column(DataType.STRING)
  declare status: string;

  @Column(DataType.STRING)
  declare titulo: string;

  @Column(DataType.TEXT)
  declare descricao: string;

  @Column(DataType.DECIMAL(12, 2))
  declare precoInicial: number;

  @Column(DataType.DECIMAL(12, 2))
  declare precoAtual: number;

  @Column(DataType.DECIMAL(12, 2))
  declare valor_incremento: number;

  @Column(DataType.DATE)
  declare terminaEm: Date;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare ativo: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare vendedorId: number;

  @BelongsTo(() => User)
  declare vendedor: User;

  @ForeignKey(() => CategoriaLeilao)
  @Column(DataType.INTEGER)
  declare categoriaLeilaoId: number;

  @BelongsTo(() => CategoriaLeilao)
  declare categoria: CategoriaLeilao;

  @HasMany(() => Lance)
  declare lances: Lance[];

  @Column(DataType.INTEGER)
  declare ganhadorId: number;
}
