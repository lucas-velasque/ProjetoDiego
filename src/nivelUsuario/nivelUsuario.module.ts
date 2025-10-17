import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { NivelUsuarioController } from "./nivelUsuario.controller";
import { NivelUsuarioService } from "./nivelUsuario.service";
import { NivelUsuario } from "./nivelUsuario.model";

@Module({
  imports: [SequelizeModule.forFeature([NivelUsuario])],
  controllers: [NivelUsuarioController],
  providers: [NivelUsuarioService],
  exports: [NivelUsuarioService],
})
export class NivelUsuarioModule {}
