# Configuração do Supabase Storage

Este guia explica como configurar o bucket de storage do Supabase para armazenar imagens dos anúncios.

## 1. Acessar o Dashboard do Supabase

1. Acesse: https://app.supabase.com/
2. Faça login e selecione seu projeto: **hfdllcymbezkmerewsct**

## 2. Configurar o Bucket de Storage

### 2.1. Verificar se o bucket existe

1. No menu lateral, clique em **Storage**
2. Procure por um bucket chamado `anuncios-fotos`
3. Se o bucket NÃO existir, crie-o:
   - Clique em **New bucket**
   - Nome: `anuncios-fotos`
   - Marque: **Public bucket** ✅
   - Clique em **Create bucket**

### 2.2. Configurar permissões (IMPORTANTE!)

Para que as imagens sejam acessíveis publicamente, você precisa adicionar políticas de acesso:

1. Clique no bucket `anuncios-fotos`
2. Vá na aba **Policies**
3. Clique em **New policy**

#### Política 1: Permitir SELECT (leitura pública)

```sql
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'anuncios-fotos');
```

**Ou usando a interface:**
- Policy name: `Allow public read access`
- Allowed operation: `SELECT`
- Target roles: `public`
- USING expression: `bucket_id = 'anuncios-fotos'`

#### Política 2: Permitir INSERT (upload autenticado)

```sql
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'anuncios-fotos');
```

**Ou usando a interface:**
- Policy name: `Allow authenticated users to upload`
- Allowed operation: `INSERT`
- Target roles: `authenticated`
- WITH CHECK expression: `bucket_id = 'anuncios-fotos'`

#### Política 3: Permitir DELETE (deletar próprias imagens)

```sql
CREATE POLICY "Allow authenticated users to delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'anuncios-fotos');
```

**Ou usando a interface:**
- Policy name: `Allow authenticated users to delete`
- Allowed operation: `DELETE`
- Target roles: `authenticated`
- USING expression: `bucket_id = 'anuncios-fotos'`

## 3. Testar o Upload

### 3.1. Via Swagger

1. Acesse: http://localhost:3000/api
2. Localize o endpoint `/upload/image`
3. Clique em **Try it out**
4. Selecione uma imagem
5. Clique em **Execute**
6. Verifique se a resposta contém a URL da imagem

### 3.2. Verificar no Dashboard

1. Volte ao Storage no Supabase Dashboard
2. Clique no bucket `anuncios-fotos`
3. Você deve ver a pasta `cartas/` com a imagem enviada
4. Clique na imagem e copie a URL pública
5. Cole a URL no navegador para verificar se a imagem é exibida

## 4. URLs das Imagens

As URLs das imagens seguirão este formato:

```
https://hfdllcymbezkmerewsct.supabase.co/storage/v1/object/public/anuncios-fotos/cartas/1234567890-imagem.jpg
```

## 5. Verificar Configuração

Execute o backend e procure pela mensagem no console:

```
✅ Supabase Storage bucket verificado/criado
```

Se aparecer algum erro, verifique:
- Credenciais no `.env` estão corretas
- Bucket foi criado manualmente (se necessário)
- Políticas de acesso foram configuradas

## 6. Solução de Problemas

### Erro: "Bucket not found"
- Verifique se o bucket `anuncios-fotos` existe no Dashboard
- Crie manualmente se necessário

### Erro: "Access denied" ou "403 Forbidden"
- Verifique se as políticas de acesso foram configuradas corretamente
- Certifique-se de que o bucket está marcado como **Public**

### Imagens não aparecem no frontend
- Verifique se a URL retornada pelo backend está correta
- Teste a URL no navegador para ver se a imagem carrega
- Verifique se o CORS está configurado no Supabase Storage

## 7. Configuração de CORS (se necessário)

Se as imagens não carregarem no frontend devido a erro de CORS:

1. No Dashboard do Supabase, vá em **Storage**
2. Clique em **Settings** (ícone de engrenagem)
3. Em **CORS Configuration**, adicione:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

**Nota:** Em produção, substitua `"*"` pelo domínio específico do seu frontend.
