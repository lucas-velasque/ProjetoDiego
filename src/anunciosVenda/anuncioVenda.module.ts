import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnunciosVendaController } from './anuncioVenda.controller';
import { AnunciosVendaService } from './anuncioVenda.service';
import { AnuncioVenda } from './entities/anuncioVenda.entity';
import { AnuncioVendaCarta } from './entities/anuncioVendaCarta.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([AnuncioVenda, AnuncioVendaCarta]),
  ],
  controllers: [AnunciosVendaController],
  providers: [AnunciosVendaService],
  exports: [AnunciosVendaService],
})
export class AnunciosVendaModule {}