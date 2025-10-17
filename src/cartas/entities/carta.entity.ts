//Pessoal, precisei fazer a estrutura da entidade Carta pra poder testar a filtragem e paginação dos anúncios de venda.
//Depois será necessário realizar uma implementação real.

import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'cartas',
  timestamps: true,
})
export class Carta extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare nome: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare tipo: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare raridade: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare pontos_saude: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
