import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnunciosCompraController } from './anuncioCompra.controller';
import { AnunciosCompraService } from './anuncioCompra.service';
import { AnuncioCompra } from './entities/anuncioCompra.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([AnuncioCompra]),
  ],
  controllers: [AnunciosCompraController],
  providers: [AnunciosCompraService],
  exports: [AnunciosCompraService],
})
export class AnunciosCompraModule {}