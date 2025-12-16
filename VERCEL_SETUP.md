# Configuração do Vercel

## Erros Corrigidos

### 1. Erro: "Please install pg package manually"
**Solução**: O pacote `pg` já está instalado no `package.json`. Certifique-se de que o Vercel está rodando `npm install` corretamente.

### 2. Erro: "Supabase credentials are not configured"
**Solução**: As variáveis de ambiente do Supabase precisam ser configuradas no Vercel.

## Variáveis de Ambiente Necessárias no Vercel

Acesse seu projeto no Vercel Dashboard → Settings → Environment Variables e adicione:

### Banco de Dados (Supabase PostgreSQL)
```
DB_DIALECT=postgres
DB_HOST=seu-projeto.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.seu-projeto-ref
DB_PASS=sua-senha-do-supabase
```

### Supabase Storage
```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

### JWT
```
JWT_SECRET=sua-chave-secreta-segura
JWT_EXPIRES_IN=1d
```

### Outras
```
NODE_ENV=production
PORT=3000
SWAGGER_EXPAND=none
```

## Como Obter as Credenciais do Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **Settings** → **API**
3. Copie:
   - **URL**: SUPABASE_URL
   - **service_role key** (secret): SUPABASE_SERVICE_ROLE_KEY
4. Para o banco de dados, vá em **Settings** → **Database**
   - **Host**: DB_HOST
   - **Database name**: DB_NAME
   - **User**: DB_USER
   - **Password**: DB_PASS (a senha que você definiu ao criar o projeto)

## Configuração do Build no Vercel

O arquivo `vercel.json` já foi criado com as configurações necessárias para serverless functions:
- Entry point: `api/index.ts`
- O Vercel compilará automaticamente o TypeScript
- Não é necessário configurar build command manualmente

### Arquivos Criados/Modificados:
- ✅ `vercel.json` - Configuração do Vercel para serverless
- ✅ `api/index.ts` - Entry point para Vercel Serverless Functions
- ✅ `.env.example` - Adicionadas variáveis do Supabase Storage
- ✅ `src/upload/upload.service.ts` - Modificado para não travar se credenciais não estiverem configuradas
- ✅ `src/main.ts` - Modificado para lidar com ausência de credenciais do Supabase

## Testando Localmente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Preencha todas as variáveis de ambiente no arquivo `.env`

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o projeto:
   ```bash
   npm run start:dev
   ```

## Troubleshooting

### Se o erro persistir no Vercel:

1. **Verifique se todas as variáveis de ambiente estão configuradas** no Vercel Dashboard
2. **Force um novo deploy** após adicionar as variáveis
3. **Verifique os logs do build** no Vercel para identificar erros específicos
4. **Certifique-se de que o build está sendo executado corretamente**:
   - O comando `npm run build` deve gerar a pasta `dist`
   - O arquivo `dist/src/main.js` deve existir

### Logs úteis para debug:
- Vá no Vercel Dashboard → seu projeto → Deployments
- Clique no deployment com erro
- Verifique as abas "Build Logs" e "Runtime Logs"
