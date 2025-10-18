import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartasService } from './cartas.service';
import { CartasController } from './cartas.controller';
import { Carta } from './entities/carta.entity';

@Module({
  imports: [SequelizeModule.forFeature([Carta])],
  controllers: [CartasController],
  providers: [CartasService],
})
export class CartasModule {}
