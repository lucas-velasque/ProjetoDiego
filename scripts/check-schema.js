const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
});

async function checkSchema() {
  try {
    await sequelize.authenticate();
    console.log('Conexao com Supabase estabelecida!\n');

    // Query para pegar informações das colunas da tabela cartas
    const [results] = await sequelize.query(`
      SELECT
        column_name,
        data_type,
        character_maximum_length,
        is_nullable,
        column_default
      FROM
        information_schema.columns
      WHERE
        table_schema = 'public'
        AND table_name = 'cartas'
      ORDER BY
        ordinal_position;
    `);

    console.log('='.repeat(80));
    console.log('SCHEMA DA TABELA: cartas');
    console.log('='.repeat(80));
    console.log();

    if (results.length === 0) {
      console.log('ATENCAO: Tabela "cartas" nao encontrada ou sem colunas!');
    } else {
      console.log(`Total de colunas: ${results.length}\n`);

      results.forEach((col, index) => {
        console.log(`${index + 1}. ${col.column_name}`);
        console.log(`   Tipo: ${col.data_type}${col.character_maximum_length ? `(${col.character_maximum_length})` : ''}`);
        console.log(`   Nullable: ${col.is_nullable}`);
        if (col.column_default) {
          console.log(`   Default: ${col.column_default}`);
        }
        console.log();
      });

      console.log('='.repeat(80));
      console.log('Lista de campos (para copiar):');
      console.log('='.repeat(80));
      results.forEach(col => {
        console.log(`- ${col.column_name}`);
      });
    }

    await sequelize.close();
  } catch (error) {
    console.error('Erro ao conectar no banco:', error.message);
    process.exit(1);
  }
}

checkSchema();
