
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'users'
        AND column_name = 'clerk_id'
    ) THEN
        ALTER TABLE users
        ADD COLUMN clerk_id VARCHAR(255) UNIQUE;

        RAISE NOTICE 'Coluna clerk_id adicionada com sucesso!';
    ELSE
        RAISE NOTICE 'Coluna clerk_id já existe, nenhuma ação necessária.';
    END IF;
END $$;

-- Criar índice na coluna clerk_id para melhorar performance de buscas
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);

-- Verificar a alteração
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name = 'clerk_id';
