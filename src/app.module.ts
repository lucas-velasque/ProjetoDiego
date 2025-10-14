import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CartasModule } from './cartas/cartas.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { AnunciosVendaModule } from './anunciosVenda/anuncioVenda.module';
import { databaseConfig } from './database/database.config';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    CartasModule,
    ComentariosModule,
    AnunciosVendaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}