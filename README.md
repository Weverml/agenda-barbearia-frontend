# 💈 Agenda Barbearia — Frontend React

Frontend do sistema de agendamento de barbearia, desenvolvido como Projeto 2 da disciplina de Programação Web — UEPB 2026.1.

## 📋 Sobre o projeto

Interface web construída em React consumindo a API do Projeto 1 (Agenda Barbearia API). Permite autenticação de usuários e gerenciamento completo de clientes, barbeiros, serviços e agendamentos de barbearia.

## 🚀 Funcionalidades

- Cadastro de usuário e login via API
- Dashboard com resumo do sistema em tempo real
- CRUD completo de Clientes
- CRUD completo de Barbeiros
- CRUD completo de Serviços
- Gerenciamento de Agendamentos (criar, alterar status, remover)
- Navegação entre telas com React Router
- Estados de loading e erro em todas as requisições

## 🖥️ Telas

- **Login** — autenticação via API
- **Cadastro** — criação de nova conta
- **Dashboard** — resumo com cards e próximos agendamentos
- **Clientes** — listagem, cadastro, edição e remoção
- **Barbeiros** — listagem, cadastro, edição e remoção
- **Serviços** — listagem, cadastro, edição e remoção
- **Agendamentos** — formulário de novo agendamento + lista completa com status

## 🛠️ Tecnologias

- React 19
- Vite
- React Router
- CSS customizado (tema escuro com identidade visual de barbearia)

## 📡 API consumida

Este frontend consome a [Agenda Barbearia API](https://github.com/Weverml/agenda-barbearia-api) — backend Node.js sem framework, com SQLite, desenvolvido no Projeto 1.

## 📁 Estrutura do projeto
agenda-barbearia-frontend/
├── src/
│ ├── components/
│ │ ├── Login.jsx
│ │ ├── Cadastro.jsx
│ │ ├── Home.jsx
│ │ ├── Clientes.jsx
│ │ ├── Barbeiros.jsx
│ │ ├── Servicos.jsx
│ │ ├── Agendamentos.jsx
│ │ └── Sidebar.jsx
│ ├── services/
│ │ └── api.js
│ ├── styles/
│ │ ├── global.css
│ │ ├── auth.css
│ │ ├── dashboard.css
│ │ └── agendamentos.css
│ ├── App.jsx
│ └── main.jsx
├── .env
├── index.html
├── package.json
└── README.md

## ▶️ Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar o ambiente
Crie um arquivo `.env` na raiz do projeto:

VITE_API_URL=http://localhost:3000


### 3. Rodar o projeto
```bash
npm run dev
```

Acesse em `http://localhost:5173`

> ⚠️ A **API do Projeto 1** precisa estar rodando em `http://localhost:3000` para o sistema funcionar.

## 🎨 Design

Protótipo desenvolvido no Figma com identidade visual de barbearia premium: tema escuro, paleta dourada e tipografia Oswald + Inter.

- [Ver protótipo no Figma](https://www.figma.com/design/GDoRCdWiU292pvpQWegRGM/Sem-título)

## 👨‍💻 Autor

Weverton Mamede Leite — [@Weverml](https://github.com/Weverml)

