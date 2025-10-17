import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoriaCartasController } from "./categoriaCartas.controller";
import { CategoriaCartasService } from "./categoriaCartas.service";
import { CategoriaCartas } from "./categoriaCartas.model";

@Module({
  imports: [SequelizeModule.forFeature([CategoriaCartas])],
  controllers: [CategoriaCartasController],
  providers: [CategoriaCartasService],
  exports: [CategoriaCartasService],
})
export class CategoriaCartasModule {}
