# 💈 Agenda Barbearia — Frontend React

Frontend do sistema de agendamento de barbearia, desenvolvido como Projeto 2 da disciplina de Programação Web — UEPB 2026.1.

## 📋 Sobre o projeto

Interface web construída em React consumindo a API do Projeto 1 (Agenda Barbearia API). Permite autenticação de usuários e gerenciamento completo de agendamentos de barbearia.

## 🚀 Funcionalidades

- Cadastro de usuário
- Login simulado com autenticação local
- Dashboard com resumo do sistema
- Gerenciamento de agendamentos (criar, alterar status, remover)
- Navegação entre telas com React Router

## 🖥️ Telas

- **Login** — autenticação do usuário
- **Cadastro** — criação de nova conta
- **Dashboard (Home)** — resumo com cards e próximos agendamentos
- **Agendamentos** — formulário de novo agendamento + lista completa

## 🛠️ Tecnologias

- React 19
- Vite
- React Router
- CSS customizado (tema escuro com identidade visual de barbearia)

## 📡 API consumida

Este frontend consome a [Agenda Barbearia API](https://github.com/Weverml/agenda_barbearia) — backend Node.js sem framework, com SQLite, desenvolvido no Projeto 1.

## 📁 Estrutura do projeto
agenda-barbearia-frontend/
├── src/
│ ├── components/ # Componentes de cada tela
│ │ ├── Login.jsx
│ │ ├── Cadastro.jsx
│ │ ├── Home.jsx
│ │ └── Agendamentos.jsx
│ ├── data/
│ │ └── usuarios.js # Dados simulados para autenticação
│ ├── App.jsx # Rotas e estado global
│ ├── App.css # Estilos globais
│ └── main.jsx
├── index.html
├── package.json
└── README.md
## ▶️ Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar o projeto
```bash
npm run dev
```

Acesse em `http://localhost:5173`

> ⚠️ Para funcionalidades completas (agendamentos, clientes, barbeiros, serviços), a **API do Projeto 1** precisa estar rodando em `http://localhost:3000`.

## 🎨 Design

Protótipo desenvolvido no Figma com identidade visual de barbearia premium: tema escuro, paleta dourada e tipografia Oswald + Inter.
