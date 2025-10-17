import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { Comentario } from '../comentario.entity';

@Module({
  imports: [SequelizeModule.forFeature([Comentario])],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}

