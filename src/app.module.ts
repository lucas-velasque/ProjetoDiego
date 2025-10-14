import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartasModule } from './cartas/cartas.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.model'; 

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        models: [User], // Adicione todos os modelos aqui
        autoLoadModels: true,
        synchronize: configService.get<boolean>('DB_SYNC') || false, // Cuidado em produção
        logging: configService.get<boolean>('DB_LOGGING') || false,
      }),
      inject: [ConfigService],
    }),
    CartasModule,
    ComentariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
