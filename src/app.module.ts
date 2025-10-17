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
import { LeiloesModule } from "./leiloes/leiloes.module";

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
    LeiloesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
