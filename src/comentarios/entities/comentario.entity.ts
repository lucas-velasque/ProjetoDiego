import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({ description: 'ID do usuário que fez o comentário', example: 1 })
  usuarioId: number;

  @BelongsTo(() => User)
  usuario: User;

  @ForeignKey(() => Carta)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
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

