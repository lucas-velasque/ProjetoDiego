import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoriaLeilaoController } from "./categoriaLeilao.controller";
import { CategoriaLeilaoService } from "./categoriaLeilao.service";
import { CategoriaLeilao } from "./categoriaLeilao.model";

@Module({
  imports: [SequelizeModule.forFeature([CategoriaLeilao])],
  controllers: [CategoriaLeilaoController],
  providers: [CategoriaLeilaoService],
  exports: [CategoriaLeilaoService],
})
export class CategoriaLeilaoModule {}
