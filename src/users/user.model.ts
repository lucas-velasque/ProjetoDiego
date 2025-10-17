import { BelongsTo, ForeignKey, Table, Column, Model, DataType, BeforeCreate, BeforeUpdate, HasMany } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { AnuncioCompra } from 'src/anunciosCompra/entities/anuncioCompra.entity';
import { AnuncioVenda } from 'src/anunciosVenda/entities/anuncioVenda.entity';
import { Proposta } from 'src/propostas/entities/proposta.entity';
import { Comentario } from 'src/comentarios/entities/comentario.entity';
import { Leilao } from 'src/leiloes/entities/leilao.model';
import { Lance } from 'src/leiloes/entities/lance.model';
import { NivelUsuario } from 'src/nivelUsuario/nivelUsuario.model';


export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @ApiProperty({ example: 1, description: 'ID único de usuário' })
  @ForeignKey(() => NivelUsuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  nivelUsuarioId: number;
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({ example: 'Joao', description: 'Nome de usuário único' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'admin', description: 'Papel do usuário', enum: UserRole })
  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER,
  })
  role: UserRole;


  // Relacionamento com AnuncioCompra: um usuário pode criar vários anúncios de compra
  @HasMany(() => AnuncioCompra, {
    foreignKey: 'usuario_id',
    as: 'anunciosCompra',
  })
  anunciosCompra: AnuncioCompra[];

  // Relacionamento com AnuncioVenda: um usuário pode criar vários anúncios de venda
  @HasMany(() => AnuncioVenda, {
    foreignKey: 'usuario_id',
    as: 'anunciosVenda',
  })
  anunciosVenda: AnuncioVenda[];

  // Relacionamento com Proposta: um usuário pode fazer várias propostas
  @HasMany(() => Proposta, {
    foreignKey: 'usuario_id',
    as: 'propostas',
  })
  propostas: Proposta[];

  // Relacionamento com Comentario: um usuário pode fazer vários comentários
  @HasMany(() => Comentario, {
    foreignKey: 'usuarioId',
    as: 'comentarios',
  })
  comentarios: Comentario[];

  // Relacionamento com Leilao: um usuário pode criar vários leilões (como vendedor)
  @HasMany(() => Leilao, {
    foreignKey: 'vendedorId',
    as: 'leiloes',
  })
  leiloes: Leilao[];

  // Relacionamento com Lance: um usuário pode dar vários lances
  @HasMany(() => Lance, {
    foreignKey: 'id_usuario',
    as: 'lances',
  })
  lances: Lance[];

  @BelongsTo(() => NivelUsuario, {
    foreignKey: 'nivelUsuarioId',
    as: 'nivel',
  })
  nivel: NivelUsuario;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const salt = await bcrypt.genSalt();
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
