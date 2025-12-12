-- Seed atualizado para o schema atual do projeto
-- Execute: psql -h localhost -U postgres -d leiloes -f seed.sql

-- 1) Garante que a coluna valor_incremento existe (idempotente)
ALTER TABLE leiloes
  ADD COLUMN IF NOT EXISTS "valor_incremento" numeric(12,2) NOT NULL DEFAULT 1;

-- 2) Nível de usuário básico
INSERT INTO "NivelUsuario"
  ("id", "nome", "descricao", "pontuacaoMinima", "corIdentificacao", "createdAt", "updatedAt")
VALUES
  (1, 'Padrão', 'Nível padrão de usuário', 0, '#cccccc', now(), now())
ON CONFLICT ("id") DO NOTHING;

-- 3) Usuários
INSERT INTO users
  ("id", "username", "password", "role", "nivelUsuarioId", "createdAt", "updatedAt")
VALUES
  (1, 'zezinho', '123456', 'user', 1, now(), now()),
  (2, 'bobao',   '123456', 'user', 1, now(), now())
ON CONFLICT ("id") DO NOTHING;

-- 4) Leilão de teste
INSERT INTO leiloes
  ("id", "status", "titulo", "descricao",
   "precoInicial", "precoAtual", "valor_incremento",
   "terminaEm", "ativo", "vendedorId",
   "categoriaLeilaoId", "ganhadorId",
   "createdAt", "updatedAt")
VALUES
  (
    gen_random_uuid(),
    'aberto',
    'Leilão Seed',
    'item teste',
    100,          -- precoInicial
    100,          -- precoAtual
    5,            -- valor_incremento
    now() + interval '7 days',
    true,
    1,            -- vendedorId (usuario id 1)
    NULL,
    NULL,
    now(),
    now()
