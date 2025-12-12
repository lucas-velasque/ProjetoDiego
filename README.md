# 🃏 API de Marketplace de Cartas Pokémon

> Mrketplace para compra, venda e leilão de cartas Pokémon com autenticação JWT e carrinho de compras.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Autenticação](#autenticação)
- [Endpoints Principais](#endpoints-principais)
- [Banco de Dados](#banco-de-dados)
- [Testes](#testes)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## 🎯 Sobre o Projeto

Esta API REST foi desenvolvida com NestJS e oferece uma plataforma completa para colecionadores de cartas Pokémon. É parte de um trabalho acadêmico feito por 4 pessoas.

- Criar anúncios de venda e compra de cartas
- Participar de leilões de cartas 
- Fazer propostas em anúncios
- Gerenciar um carrinho de compras
- Avaliar e comentar sobre cartas
- Sistema de autenticação e autorização

---

## 🚀 Tecnologias Utilizadas

### Backend
- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Sequelize](https://sequelize.org/)** - ORM para Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional

### Autenticação & Segurança
- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação

### Validação & Documentação
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de DTOs
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos
- **[Swagger/OpenAPI](https://swagger.io/)** - Documentação interativa da API

### Infraestrutura
- **[Supabase](https://supabase.com/)** - Banco de dados PostgreSQL hospedado
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gerenciamento de variáveis de ambiente

---

## ✨ Funcionalidades

### 🔐 Autenticação e Autorização
- Registro e login de usuários
- Autenticação via JWT
- Sistema de roles (usuário, administrador)
- Proteção de rotas com guards customizados

### 🃏 Gerenciamento de Cartas
- Cadastro de cartas Pokémon
- Categorização de cartas (raridade, tipo, etc)
- Comentários e avaliações (1-5 estrelas)
- Sistema de busca e filtros

### 📢 Anúncios
- **Anúncios de Venda**: Criar, editar, visualizar e deletar
- **Anúncios de Compra**: Criar demandas de compra
- Sistema de propostas para anúncios
- Filtros avançados (preço, raridade, condição, status)
- Paginação de resultados

### 🔨 Leilões
- Criar leilões de cartas raras
- Sistema de lances
- Controle de tempo de leilão
- Categorias de leilão
- Visualizar leilões ativos

### 🛒 Carrinho de Compras
- Adicionar/remover itens do carrinho
- Visualizar carrinho
- Finalizar compra (checkout)
- Histórico de pedidos
- Cancelamento de pedidos
- Filtros de pedidos por status e data

### 💬 Propostas
- Criar propostas em anúncios
- Aceitar/recusar propostas
- Filtrar propostas por valor e status
- Visualizar histórico de propostas

---

## 🏗️ Arquitetura

O projeto segue a arquitetura modular do NestJS com os seguintes padrões:

```
src/
├── auth/              # Módulo de autenticação JWT
├── users/             # Gerenciamento de usuários
├── cartas/            # CRUD de cartas Pokémon
├── comentarios/       # Sistema de comentários e avaliações
├── anunciosVenda/     # Anúncios de venda
├── anunciosCompra/    # Anúncios de compra
├── propostas/         # Sistema de propostas
├── leiloes/           # Sistema de leilões
├── carrinho/          # Carrinho de compras e pedidos
├── categoriaCartas/   # Categorias de cartas
├── categoriaLeilao/   # Categorias de leilão
├── nivelUsuario/      # Níveis de usuário
├── common/            # Decorators, guards e utilitários
└── database/          # Configuração do banco de dados
```

### Padrões Utilizados
- **Repository Pattern** com Sequelize
- **DTO Pattern** para validação de dados
- **Dependency Injection** nativo do NestJS
- **Guards** para autenticação e autorização
- **Decorators customizados** (@UsuarioAtual, @Public, @Roles)

---

## 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=marketplace_cartas

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui
JWT_EXPIRES_IN=1h

# Aplicação
PORT=3000
NODE_ENV=development
```

### 2. Configuração do Banco de Dados

O projeto está configurado para usar **Supabase** por padrão, mas você pode usar qualquer instância PostgreSQL.



### 3. Sincronização do Banco

O projeto usa `synchronize: true` no Sequelize, então as tabelas serão criadas automaticamente ao iniciar a aplicação.

## 📚 Documentação da API

A documentação interativa da API está disponível via **Swagger UI**.

Após iniciar o servidor, acesse:

```
http://localhost:3000/api
```

## 🌐 Endpoints da API

> **Total: 70 Endpoints** distribuídos em 13 módulos

### 📊 Estatísticas Gerais
- **Endpoints Públicos:** 52
- **Endpoints Protegidos:** 18
  - Autenticação JWT: 13 endpoints
  - Autenticação + Admin: 5 endpoints

**Distribuição por Método HTTP:**
- GET: 26 | POST: 19 | PUT: 9 | PATCH: 4 | DELETE: 12

---

### 1. Aplicação (1 endpoint)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| GET | `/` | 🌐 Público | Mensagem de boas-vindas da API |

---

### 2. Autenticação (3 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/auth/register` | 🌐 Público | Registrar novo usuário |
| POST | `/auth/login` | 🌐 Público | Fazer login e obter token JWT |
| GET | `/auth/profile` | 🔒 Protegido | Obter perfil do usuário autenticado |

---

### 3. Usuários (5 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/users` | 🌐 Público | Criar novo usuário |
| GET | `/users` | 🔐 Admin | Listar todos os usuários |
| GET | `/users/:id` | 🔐 Admin | Buscar usuário por ID |
| PUT | `/users/:id` | 🔐 Admin | Atualizar usuário |
| DELETE | `/users/:id` | 🔐 Admin | Excluir usuário |

---

### 4. Cartas (5 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/cartas` | 🔒 Protegido | Criar nova carta Pokémon |
| GET | `/cartas` | 🔒 Protegido | Listar todas as cartas |
| GET | `/cartas/:id` | 🔒 Protegido | Buscar carta por ID |
| PATCH | `/cartas/:id` | 🔒 Protegido | Atualizar carta |
| DELETE | `/cartas/:id` | 🔒 Protegido | Remover carta |

---

### 5. Categoria de Cartas (5 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/categoriaCartas` | 🌐 Público | Criar nova categoria de carta |
| GET | `/categoriaCartas` | 🌐 Público | Listar categorias (filtros: nome, paginação) |
| GET | `/categoriaCartas/:id` | 🌐 Público | Buscar categoria por ID |
| PUT | `/categoriaCartas/:id` | 🌐 Público | Atualizar categoria |
| DELETE | `/categoriaCartas/:id` | 🌐 Público | Excluir categoria |

---

### 6. Anúncios de Venda (5 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/anuncios-venda` | 🔒 Protegido | Criar novo anúncio de venda |
| GET | `/anuncios-venda` | 🌐 Público | Listar anúncios (filtros: preço, condição, raridade, status, datas) |
| GET | `/anuncios-venda/:id` | 🌐 Público | Buscar anúncio por ID |
| PUT | `/anuncios-venda/:id` | 🌐 Público | Atualizar anúncio |
| DELETE | `/anuncios-venda/:id` | 🌐 Público | Deletar anúncio |

---

### 7. Anúncios de Compra (5 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/anuncios-compra` | 🔒 Protegido | Criar anúncio de compra |
| GET | `/anuncios-compra` | 🌐 Público | Listar anúncios com filtros |
| GET | `/anuncios-compra/:id` | 🌐 Público | Buscar anúncio por ID |
| PUT | `/anuncios-compra/:id` | 🌐 Público | Atualizar anúncio |
| DELETE | `/anuncios-compra/:id` | 🌐 Público | Deletar anúncio |

---

### 8. Propostas (6 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/anuncios/:tipo/:id/propostas` | 🔒 Protegido | Criar proposta em um anúncio |
| GET | `/anuncios/:tipo/:id/propostas` | 🌐 Público | Listar propostas (filtros: valor, status, paginação) |
| GET | `/propostas/:id` | 🌐 Público | Buscar proposta por ID |
| PUT | `/propostas/:id` | 🌐 Público | Atualizar proposta |
| DELETE | `/propostas/:id` | 🌐 Público | Deletar proposta |
| PUT | `/propostas/:id/aceitar` | 🌐 Público | Aceitar proposta |

---

### 9. Leilões (5 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/leiloes` | 🌐 Público | Criar novo leilão de carta |
| GET | `/leiloes` | 🌐 Público | Listar leilões (filtros: título, paginação) |
| GET | `/leiloes/:id` | 🌐 Público | Visualizar leilão com detalhes completos |
| PATCH | `/leiloes/:id` | 🌐 Público | Atualizar leilão |
| DELETE | `/leiloes/:id` | 🌐 Público | Excluir leilão |

---

### 10. Categoria de Leilão (5 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/CategoriaLeilao` | 🌐 Público | Criar categoria de leilão |
| GET | `/CategoriaLeilao` | 🌐 Público | Listar categorias (filtros: nome, paginação) |
| GET | `/CategoriaLeilao/:id` | 🌐 Público | Buscar categoria por ID |
| PUT | `/CategoriaLeilao/:id` | 🌐 Público | Atualizar categoria |
| DELETE | `/CategoriaLeilao/:id` | 🌐 Público | Excluir categoria |

---

### 11. Nível de Usuário (5 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/NivelUsuario` | 🌐 Público | Criar novo nível de usuário |
| GET | `/NivelUsuario` | 🌐 Público | Listar níveis (filtros: nome, paginação) |
| GET | `/NivelUsuario/:id` | 🌐 Público | Buscar nível por ID |
| PUT | `/NivelUsuario/:id` | 🌐 Público | Atualizar nível |
| DELETE | `/NivelUsuario/:id` | 🌐 Público | Excluir nível |

---

### 12. Comentários (5 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/comentarios` | 🔒 Protegido | Criar comentário e avaliação (1-5 estrelas) |
| GET | `/comentarios` | 🌐 Público | Listar todos os comentários |
| GET | `/comentarios/:id` | 🌐 Público | Buscar comentário por ID |
| PATCH | `/comentarios/:id` | 🔒 Protegido | Atualizar comentário |
| DELETE | `/comentarios/:id` | 🔒 Protegido | Remover comentário |

---

### 13. Carrinho e Pedidos (7 endpoints)
| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/carrinho` | 🔒 Protegido | Adicionar item ao carrinho |
| GET | `/carrinho` | 🔒 Protegido | Visualizar carrinho do usuário |
| DELETE | `/carrinho/:itemId` | 🔒 Protegido | Remover item do carrinho |
| POST | `/carrinho/checkout` | 🔒 Protegido | Finalizar compra (criar pedido) |
| GET | `/pedidos` | 🔒 Protegido | Listar pedidos (filtros: status, datas) |
| GET | `/pedidos/:id` | 🔒 Protegido | Detalhar pedido específico |
| POST | `/pedidos/:id/cancelar` | 🔒 Protegido | Cancelar pedido |

---




