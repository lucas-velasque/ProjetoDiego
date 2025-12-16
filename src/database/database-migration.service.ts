import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { addClerkIdColumn } from './migrations/add-clerk-id.migration';
import { AddFotoUrlMigration } from './migrations/add-foto-url.migration';

@Injectable()
export class DatabaseMigrationService implements OnModuleInit {
  constructor(
    private sequelize: Sequelize,
    private addFotoUrlMigration: AddFotoUrlMigration,
  ) {}

  async onModuleInit() {
    try {
      console.log('🔄 Executando migrações do banco de dados...');

      // Executar migração para adicionar clerk_id
      await addClerkIdColumn(this.sequelize.getQueryInterface());

      // Executar migração para adicionar foto_url
      await this.addFotoUrlMigration.run();

      console.log('✅ Migrações concluídas com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao executar migrações:', error.message);
    }
  }
}
