# Projeto ASFUS - Portal e CMS

Este repositório contém o código-fonte de uma Single Page Application (SPA) desenvolvida em React para o portal da ASFUS (Associação dos Funcionários da Saúde de Sete Lagoas), incluindo um painel administrativo completo para gerenciamento de conteúdo (CMS).

O projeto também inclui um backend mock em Node.js/Express para simular uma API RESTful, permitindo que o frontend seja totalmente funcional para fins de demonstração e desenvolvimento.

## ✨ Funcionalidades

### Portal do Associado (Frontend)
- **Página Inicial:** Apresentação da associação e seus benefícios.
- **Pré-Cadastro:** Formulário moderno e dinâmico para novos associados, com suporte para adicionar múltiplos dependentes.
- **Login Seguro:** Páginas de login separadas para associados e administradores.
- **Portal do Associado:** Área logada onde o membro pode visualizar seus dados e gerenciar seus dependentes.
- **Design Moderno:** Interface limpa, responsiva e acessível.

### Painel Administrativo (CMS)
- **Dashboard Seguro:** Acesso protegido por autenticação de administrador.
- **Aprovação de Membros:** Interface para visualizar e aprovar novos pré-cadastros.
- **Gerenciamento de Conteúdo (CRUD Completo):**
  - **Notícias:** Crie, edite e delete notícias para o portal.
  - **Convênios:** Gerencie a lista de convênios e benefícios oferecidos.
  - **Eventos:** Adicione e atualize os eventos da associação.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18:** Biblioteca principal para a construção da interface.
- **Vite:** Build tool de alta performance para desenvolvimento.
- **React Router v6:** Para roteamento de páginas, incluindo rotas aninhadas.
- **Axios:** Cliente HTTP para comunicação com a API.
- **CSS Modules:** Para estilização encapsulada e livre de conflitos.

### Backend (Mock)
- **Node.js:** Ambiente de execução do servidor.
- **Express.js:** Framework para a construção da API.
- **CORS:** Habilitado para permitir a comunicação entre o frontend e o backend.
- **Banco de Dados:** Simulado com arrays em memória. **Atenção:** os dados são resetados a cada reinicialização do servidor.

## ⚙️ Instalação e Execução

Siga os passos abaixo para executar o projeto localmente.

**Pré-requisitos:**
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

### 1. Backend

Primeiro, inicie o servidor da API.

```bash
# 1. Navegue até a pasta do backend
cd backend

# 2. Instale as dependências
npm install express cors

# 3. Inicie o servidor
node server.js
```
O servidor estará rodando em `http://localhost:3000`. Deixe este terminal aberto.

### 2. Frontend

Em um **novo terminal**, inicie a aplicação React.

```bash
# 1. Navegue até a pasta raiz do projeto (se não estiver nela)
# cd /caminho/para/react

# 2. Instale as dependências do frontend
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

## 🧪 Credenciais para Teste

Use os seguintes dados para testar os diferentes níveis de acesso:

#### Usuário Administrador
- **Página:** `/admin/login`
- **Email:** `admin@asfus.com.br`
- **Senha:** `adminpassword`

#### Usuário Associado
- **Página:** `/login`
- **Email:** `associado@asfus.com.br`
- **Senha:** `associadopassword`

## 📜 Scripts Disponíveis

No diretório raiz do frontend, você pode executar:

- `npm run dev`: Inicia o servidor de desenvolvimento com Hot-Reload.
- `npm run build`: Gera a versão de produção otimizada do projeto na pasta `dist/`.
- `npm run lint`: Executa o linter para análise de código.
- `npm run preview`: Inicia um servidor local para visualizar a versão de produção.