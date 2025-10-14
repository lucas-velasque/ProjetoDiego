import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartasModule } from './cartas/cartas.module';
import { ComentariosModule } from './comentarios/comentarios.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'seu_usuario',
      password: 'sua_senha',
      database: 'nome_do_banco',
      autoLoadModels: true,
      synchronize: true, // apenas em desenvolvimento!
    }),
    CartasModule,
    ComentariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
