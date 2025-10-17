import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

// Placeholder para o modelo User (assumindo que existe no projeto principal)
@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
}

// Placeholder para o modelo Product (assumindo que existe no projeto principal)
@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
}

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
  id: number;

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

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  produtoId: number;

  @BelongsTo(() => Product)
  produto: Product;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}

