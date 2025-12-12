<<<<<<< HEAD
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
import { User } from '../../users/entities/user.entity';
=======
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.model';
import { Carta } from 'src/cartas/entities/carta.entity';
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036

@Table({
  tableName: 'comentarios',
  timestamps: true,
})
<<<<<<< HEAD
export class Comentario extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

=======
export class Comentario extends Model<Comentario> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ description: 'ID do comentário', example: 1 })
  declare id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  @ApiProperty({ description: 'Conteúdo do comentário', example: 'Ótima carta!' })
  texto: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  })
  @ApiProperty({ description: 'Avaliação do comentário (1 a 5 estrelas)', example: 5, minimum: 1, maximum: 5, required: false })
  avaliacao: number; // 1 a 5 estrelas

>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
<<<<<<< HEAD
  declare usuario_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare texto: string;

  // Relacionamento polymorphic - pode comentar em diferentes entidades
=======
  @ApiProperty({ description: 'ID do usuário que fez o comentário', example: 1 })
  usuarioId: number;

  @BelongsTo(() => User)
  usuario: User;

  @ForeignKey(() => Carta)
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
<<<<<<< HEAD
  declare entity_id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare entity_type: string; // ex: 'anuncio_venda', 'anuncio_compra', 'leilao', 'proposta'

  @Column({
    type: DataType.ENUM('ativo', 'deletado'),
    allowNull: false,
    defaultValue: 'ativo',
  })
  declare status: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Relacionamento com User
  @BelongsTo(() => User)
  declare usuario: User;
}
=======
  @ApiProperty({ description: 'ID da carta comentada', example: 1 })
  cartaId: number;

  @BelongsTo(() => Carta)
  carta: Carta;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  @ApiProperty({ description: 'Data de criação do comentário', example: '2023-10-27T10:00:00Z' })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  @ApiProperty({ description: 'Data da última atualização do comentário', example: '2023-10-27T10:30:00Z' })
  declare updatedAt: Date;
}

>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
