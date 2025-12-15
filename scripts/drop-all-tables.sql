-- ========================================
-- SCRIPT PARA DELETAR TODAS AS TABELAS
-- ========================================
--script DELETA TODOS OS DADOS!
-- Desabilita checagem de foreign keys temporariamente
SET session_replication_role = 'replica';

-- Deleta todas as tabelas na ordem correta (respeitando FKs)
DROP TABLE IF EXISTS anuncios_venda_cartas CASCADE;
DROP TABLE IF EXISTS anuncios_venda CASCADE;
DROP TABLE IF EXISTS anuncios_compra CASCADE;
DROP TABLE IF EXISTS propostas CASCADE;
DROP TABLE IF EXISTS comentarios CASCADE;
DROP TABLE IF EXISTS leiloes CASCADE;
DROP TABLE IF EXISTS carrinho CASCADE;
DROP TABLE IF EXISTS cartas CASCADE;
DROP TABLE IF EXISTS categoria_cartas CASCADE;
DROP TABLE IF EXISTS categoria_leilao CASCADE;
DROP TABLE IF EXISTS nivel_usuario CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Reabilita checagem de foreign keys
SET session_replication_role = 'origin';

-- Deleta sequences (auto increment) se existirem
DROP SEQUENCE IF EXISTS cartas_id_seq CASCADE;
DROP SEQUENCE IF EXISTS users_id_seq CASCADE;
DROP SEQUENCE IF EXISTS anuncios_venda_id_seq CASCADE;
DROP SEQUENCE IF EXISTS anuncios_compra_id_seq CASCADE;
DROP SEQUENCE IF EXISTS propostas_id_seq CASCADE;
DROP SEQUENCE IF EXISTS comentarios_id_seq CASCADE;
DROP SEQUENCE IF EXISTS leiloes_id_seq CASCADE;
DROP SEQUENCE IF EXISTS categoria_cartas_id_seq CASCADE;
DROP SEQUENCE IF EXISTS categoria_leilao_id_seq CASCADE;
DROP SEQUENCE IF EXISTS nivel_usuario_id_seq CASCADE;
DROP SEQUENCE IF EXISTS anuncios_venda_cartas_id_seq CASCADE;

SELECT 'Todas as tabelas foram deletadas. Reinicie o backend para recria-las.' as status;
