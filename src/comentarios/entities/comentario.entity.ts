import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
//troquei os placeholders pelo modelo real 
import { User } from 'src/users/user.model';
import { Carta } from 'src/cartas/entities/carta.entity';

@Table({
  tableName: 'comentarios',
  timestamps: true,
})
export class Comentario extends Model<Comentario> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  texto: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  })
  avaliacao: number; // 1 a 5 estrelas

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuarioId: number;

  @BelongsTo(() => User)
  usuario: User;

  @ForeignKey(() => Carta)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cartaId: number;

  @BelongsTo(() => Carta)
  carta: Carta;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;
}

