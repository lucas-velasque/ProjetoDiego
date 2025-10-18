
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

export type UserType = User;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ where: { username } });
    return user === null ? undefined : user;
  }

  async create(userData: any): Promise<User> {
    return this.userModel.create(userData);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userModel.findByPk(id);
    return user === null ? undefined : user;
  }

  async update(id: number, userData: any): Promise<[number, User[]]> {
    return this.userModel.update(userData, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}
