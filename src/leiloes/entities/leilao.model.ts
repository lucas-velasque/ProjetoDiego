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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  @Default(() => uuid())
  @Column(DataType.UUID)
  declare id: string;

  @Column(DataType.STRING)
  status!: string;

  @Column(DataType.STRING)
  titulo!: string;

  @Column(DataType.TEXT)
  descricao?: string;

  @Column(DataType.DECIMAL(12, 2))
  precoInicial!: number;

  @Column(DataType.DECIMAL(12, 2))
  precoAtual!: number;

  @Column(DataType.DECIMAL(12, 2))
  valor_incremento!: number;

  @Column(DataType.DATE)
  terminaEm!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  ativo!: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  vendedorId!: number;

  @BelongsTo(() => User)
  vendedor!: User;

  @ForeignKey(() => CategoriaLeilao)
  @Column(DataType.INTEGER)
  categoriaLeilaoId?: number;

  @BelongsTo(() => CategoriaLeilao)
  categoria!: CategoriaLeilao;

  @HasMany(() => Lance)
  lances!: Lance[];

  @Column(DataType.INTEGER)
  ganhadorId?: number;
  id_usuario: number;
}
