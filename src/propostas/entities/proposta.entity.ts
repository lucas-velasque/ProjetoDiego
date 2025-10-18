import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { AnuncioVenda } from 'src/anunciosVenda/entities/anuncioVenda.entity';
import { AnuncioCompra } from 'src/anunciosCompra/entities/anuncioCompra.entity';

@Table({
  tableName: 'propostas',
  timestamps: true,
})
export class Proposta extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  // Tipo de anúncio: determina se a proposta é para venda ou compra (relacionamento polimórfico)
  @Column({
    type: DataType.ENUM('venda', 'compra'),
    allowNull: false,
  })
  declare anuncio_tipo: string;

  // ID do anúncio (pode ser AnuncioVenda ou AnuncioCompra, dependendo do anuncio_tipo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare anuncio_id: number;

  // Relacionamento com User: cada proposta pertence a um usuário que a criou
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare usuario_id: number;

  @BelongsTo(() => User)
  declare usuario: User;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare valor_proposto: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare mensagem: string;

  @Column({
    type: DataType.ENUM('pendente', 'aceita', 'recusada', 'cancelada'),
    allowNull: false,
    defaultValue: 'pendente',
  })
  declare status: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Métodos auxiliares para relacionamento polimórfico
  // Para buscar o anúncio correto baseado no tipo, usar nos services/controllers:
  // if (proposta.anuncio_tipo === 'venda') { await AnuncioVenda.findByPk(proposta.anuncio_id) }
  // if (proposta.anuncio_tipo === 'compra') { await AnuncioCompra.findByPk(proposta.anuncio_id) }
}