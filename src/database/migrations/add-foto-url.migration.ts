import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AddFotoUrlMigration {
  constructor(private sequelize: Sequelize) {}

  async run() {
    const queryInterface = this.sequelize.getQueryInterface();

    try {
      // Verificar se a coluna foto_url já existe
      const tableDescription = await queryInterface.describeTable('anuncios_venda_cartas');

      if (!tableDescription.foto_url) {
        console.log('Adicionando coluna foto_url na tabela anuncios_venda_cartas...');
        await queryInterface.addColumn('anuncios_venda_cartas', 'foto_url', {
          type: 'TEXT',
          allowNull: true,
        });
        console.log('Coluna foto_url adicionada com sucesso!');
      } else {
        console.log('Coluna foto_url já existe na tabela anuncios_venda_cartas');
      }
    } catch (error) {
      console.error('Erro ao adicionar coluna foto_url:', error);
      throw error;
    }
  }
}
