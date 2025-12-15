import { QueryInterface, DataTypes } from 'sequelize';

/**
 * Migration: Adicionar coluna clerk_id à tabela users
 * Executa automaticamente quando o servidor iniciar
 */
export async function addClerkIdColumn(queryInterface: QueryInterface): Promise<void> {
  try {
    // Verificar se a coluna já existe
    const tableDescription = await queryInterface.describeTable('users');

    if (!tableDescription.clerk_id) {
      console.log('🔄 Adicionando coluna clerk_id à tabela users...');

      await queryInterface.addColumn('users', 'clerk_id', {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      });

      // Criar índice para melhorar performance
      await queryInterface.addIndex('users', ['clerk_id'], {
        name: 'idx_users_clerk_id',
        unique: true,
      });

      console.log('✅ Coluna clerk_id adicionada com sucesso!');
    } else {
      console.log('✓ Coluna clerk_id já existe');
    }
  } catch (error) {
    console.error('❌ Erro ao adicionar coluna clerk_id:', error.message);
    // Não lançar erro para não quebrar o servidor
  }
}
