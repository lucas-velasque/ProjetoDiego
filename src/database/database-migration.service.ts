import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { addClerkIdColumn } from './migrations/add-clerk-id.migration';

@Injectable()
export class DatabaseMigrationService implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      console.log('🔄 Executando migrações do banco de dados...');

      // Executar migração para adicionar clerk_id
      await addClerkIdColumn(this.sequelize.getQueryInterface());

      console.log('✅ Migrações concluídas com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao executar migrações:', error.message);
    }
  }
}
