import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoriaLeilaoController } from "./categoriaLeilao.controller";
import { CategoriaLeilaoService } from "./categoriaLeilao.service";
import { CategoriaLeilao } from "./categoriaLeilao.model";
import { LeiloesModule } from "../leiloes/leiloes.module";
// tive que adicionar o LeiloesModule aqui para evitar erro de dependencia circular
@Module({
  imports: [SequelizeModule.forFeature([CategoriaLeilao]), LeiloesModule],
  controllers: [CategoriaLeilaoController],
  providers: [CategoriaLeilaoService],
  exports: [CategoriaLeilaoService],
})
export class CategoriaLeilaoModule {}
