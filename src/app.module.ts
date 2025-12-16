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
import { PropostasModule } from "./propostas/propostas.module";
import { CategoriaCartasModule } from "./categoriaCartas/categoriaCartas.module";
import { CategoriaLeilaoModule } from "./categoriaLeilao/categoriaLeilao.module";
import { NivelUsuarioModule } from "./nivelUsuario/nivelUsuario.module";
import { ConfigModule } from "@nestjs/config";
import { LeiloesModule } from "./leiloes/leiloes.module";
import { CarrinhoModule } from "./carrinho/carrinho.module";
import { DatabaseMigrationService } from "./database/database-migration.service";
import { AddFotoUrlMigration } from "./database/migrations/add-foto-url.migration";
import { UploadModule } from "./upload/upload.module";

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
    PropostasModule,
    CategoriaCartasModule,
    CategoriaLeilaoModule,
    NivelUsuarioModule,
    LeiloesModule,
    CarrinhoModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseMigrationService, AddFotoUrlMigration],
})
export class AppModule {}
