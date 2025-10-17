import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CartasModule } from "./cartas/cartas.module";
import { ComentariosModule } from "./comentarios/comentarios.module";
import { AnunciosVendaModule } from "./anunciosVenda/anuncioVenda.module";
import { databaseConfig } from "./database/database.config";
import { AnunciosCompraModule } from "./anunciosCompra/anuncioCompra.module";
import { ConfigModule } from "@nestjs/config";
import { NivelUsuarioModule } from "./nivel-usuario/nivelUsuario.module";
import { LeiloesModule } from "./leiloes/leiloes.module";
import { CategoriaCartasModule } from "./categoriaCartas/categoriaCartas.module";
import { CategoriaLeilaoModule } from "./categoria-leilao/categoriaLeilao.module";
import { NivelUsuarioModule } from "./nivel-usuario/nivelUsuario.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    CartasModule,
    ComentariosModule,
    AnunciosVendaModule,
    AnunciosCompraModule,
    NivelUsuarioModule,
    CategoriaCartasModule,
    CategoriaLeilaoModule,
    LeiloesModule,
    NivelUsuarioModule, //test
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
