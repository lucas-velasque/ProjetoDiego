import { Module } from '@nestjs/common';
import { CartasService } from './cartas.service';
import { CartasController } from './cartas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Carta } from './entities/carta.entity';

@Module({
  controllers: [CartasController],
  providers: [CartasService],
  imports: [SequelizeModule.forFeature([Carta])],
})
export class CartasModule {}
