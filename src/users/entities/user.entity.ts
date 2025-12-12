import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { NivelUsuario } from '../../nivelUsuario/nivelUsuario.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare nome: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare senha: string;

  @ForeignKey(() => NivelUsuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 1,
  })
  declare nivel_usuario_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare pontuacao: number;

  @Column({
    type: DataType.ENUM('ativo', 'inativo', 'bloqueado'),
    allowNull: false,
    defaultValue: 'ativo',
  })
  declare status: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Relacionamento com NivelUsuario
  @BelongsTo(() => NivelUsuario)
  declare nivelUsuario: NivelUsuario;
}
