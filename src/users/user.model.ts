import { BelongsTo, ForeignKey, Table, Column, Model, DataType, BeforeCreate, BeforeUpdate, HasMany } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ 
    example: 1, 
    description: 'ID único do usuário' 
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({ 
    example: 'joao_silva', 
    description: 'Nome de usuário único' 
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @ApiProperty({ 
    description: 'Senha criptografada do usuário (não retornada em consultas)',
    writeOnly: true 
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ 
    example: 'user', 
    description: 'Papel do usuário no sistema', 
    enum: UserRole,
    default: UserRole.USER
  })
  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER,
  })
  role: UserRole;

  @ApiPropertyOptional({ 
    example: 1, 
    description: 'ID do nível do usuário',
    nullable: true
  })
  @ForeignKey(() => NivelUsuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  nivelUsuarioId: number;

  @ApiProperty({ 
    description: 'Data de criação do usuário',
    example: '2024-01-15T10:30:00.000Z'
  })
  declare createdAt: Date;

  @ApiProperty({ 
    description: 'Data da última atualização do usuário',
    example: '2024-01-20T15:45:00.000Z'
  })
  declare updatedAt: Date;

  // Relacionamento com AnuncioCompra: um usuário pode criar vários anúncios de compra
  @ApiPropertyOptional({ 
    description: 'Anúncios de compra criados pelo usuário',
    type: () => AnuncioCompra,
    isArray: true
  })
  @HasMany(() => AnuncioCompra, {
    foreignKey: 'usuario_id',
    as: 'anunciosCompra',
  })
  anunciosCompra: AnuncioCompra[];

  // Relacionamento com AnuncioVenda: um usuário pode criar vários anúncios de venda
  @ApiPropertyOptional({ 
    description: 'Anúncios de venda criados pelo usuário',
    type: () => AnuncioVenda,
    isArray: true
  })
  @HasMany(() => AnuncioVenda, {
    foreignKey: 'usuario_id',
    as: 'anunciosVenda',
  })
  anunciosVenda: AnuncioVenda[];

  // Relacionamento com Proposta: um usuário pode fazer várias propostas
  @ApiPropertyOptional({ 
    description: 'Propostas feitas pelo usuário',
    type: () => Proposta,
    isArray: true
  })
  @HasMany(() => Proposta, {
    foreignKey: 'usuario_id',
    as: 'propostas',
  })
  propostas: Proposta[];

  // Relacionamento com Comentario: um usuário pode fazer vários comentários
  @ApiPropertyOptional({ 
    description: 'Comentários feitos pelo usuário',
    type: () => Comentario,
    isArray: true
  })
  @HasMany(() => Comentario, {
    foreignKey: 'usuarioId',
    as: 'comentarios',
  })
  comentarios: Comentario[];

  // Relacionamento com Leilao: um usuário pode criar vários leilões (como vendedor)
  @ApiPropertyOptional({ 
    description: 'Leilões criados pelo usuário como vendedor',
    type: () => Leilao,
    isArray: true
  })
  @HasMany(() => Leilao, {
    foreignKey: 'vendedorId',
    as: 'leiloes',
  })
  leiloes: Leilao[];

  // Relacionamento com Lance: um usuário pode dar vários lances
  @ApiPropertyOptional({ 
    description: 'Lances feitos pelo usuário em leilões',
    type: () => Lance,
    isArray: true
  })
  @HasMany(() => Lance, {
    foreignKey: 'id_usuario',
    as: 'lances',
  })
  lances: Lance[];

  // Relacionamento com NivelUsuario
  @ApiPropertyOptional({ 
    description: 'Nível/categoria do usuário no sistema',
    type: () => NivelUsuario
  })
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