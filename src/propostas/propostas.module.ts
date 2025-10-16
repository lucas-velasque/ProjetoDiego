import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropostasController } from './propostas.controller';
import { PropostasService } from './propostas.service';
import { Proposta } from './entities/proposta.entity';
import { AnuncioVenda } from '../anunciosVenda/entities/anuncioVenda.entity';
import { AnuncioCompra } from '../anunciosCompra/entities/anuncioCompra.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Proposta, AnuncioVenda, AnuncioCompra]),
  ],
  controllers: [PropostasController],
  providers: [PropostasService],
  exports: [PropostasService],
})
export class PropostasModule {}