import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

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
