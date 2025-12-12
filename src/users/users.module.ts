import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
<<<<<<< HEAD
import { User } from './entities/user.entity';
=======
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}