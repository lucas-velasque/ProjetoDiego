import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Leilao } from "./entities/leilao.model";
import { Lance } from "./entities/lance.model";
import { LeiloesService } from "./leiloes.service";
import { LeiloesController } from "./leiloes.controller";

@Module({
  imports: [SequelizeModule.forFeature([Leilao, Lance])],
  controllers: [LeiloesController],
  providers: [LeiloesService],
  exports: [SequelizeModule],
})
export class LeiloesModule {}
