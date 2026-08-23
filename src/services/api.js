const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// --- USUARIOS ---
export async function listarUsuarios() {
  const resp = await fetch(`${API_URL}/usuarios`);
  if (!resp.ok) throw new Error('Falha ao carregar usuários.');
  return resp.json();
}

export async function cadastrarUsuario(dados) {
  const resp = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.error || 'Erro ao cadastrar.');
  return corpo;
}

export async function fazerLogin(email, senha) {
  const resp = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.error || 'E-mail ou senha inválidos.');
  return corpo;
}

// --- CLIENTES ---
export async function listarClientes() {
  const resp = await fetch(`${API_URL}/clientes`);
  if (!resp.ok) throw new Error('Falha ao carregar clientes.');
  return resp.json();
}

// --- BARBEIROS ---
export async function listarBarbeiros() {
  const resp = await fetch(`${API_URL}/barbeiros`);
  if (!resp.ok) throw new Error('Falha ao carregar barbeiros.');
  return resp.json();
}

// --- SERVICOS ---
export async function listarServicos() {
  const resp = await fetch(`${API_URL}/servicos`);
  if (!resp.ok) throw new Error('Falha ao carregar serviços.');
  return resp.json();
}

// --- AGENDAMENTOS ---
export async function listarAgendamentos() {
  const resp = await fetch(`${API_URL}/agendamentos`);
  if (!resp.ok) throw new Error('Falha ao carregar agendamentos.');
  return resp.json();
}

export async function criarAgendamento(dados) {
  const resp = await fetch(`${API_URL}/agendamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.error || 'Erro ao criar agendamento.');
  return corpo;
}

export async function atualizarAgendamento(id, dados) {
  const resp = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.error || 'Erro ao atualizar agendamento.');
  return corpo;
}

export async function removerAgendamento(id) {
  const resp = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'DELETE',
  });
  if (resp.status === 204) return null;
  if (!resp.ok) throw new Error('Erro ao remover agendamento.');
  return null;
}