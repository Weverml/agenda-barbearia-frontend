import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import '../styles/dashboard.css'
import '../styles/agendamentos.css'

const clientesSimulados = [
  { id: 1, nome: 'Carlos Eduardo' },
  { id: 2, nome: 'Fernando Henrique' },
  { id: 3, nome: 'Alexandre Pires' },
  { id: 4, nome: 'Maurício Santana' },
]

const barbeirosSimulados = [
  { id: 1, nome: 'Marcos Oliveira' },
  { id: 2, nome: 'Lucas Souza' },
  { id: 3, nome: 'Guilherme Reis' },
]

const servicosSimulados = [
  { id: 1, nome: 'Corte Degradê & Barba' },
  { id: 2, nome: 'Corte Social Premium' },
  { id: 3, nome: 'Grooming Barba Completa' },
  { id: 4, nome: 'Corte Clássico' },
]

const agendamentosIniciais = [
  { id: 1, clienteId: 1, barbeiroId: 1, servicoId: 1, data: '22/10/2025', hora: '14:30', status: 'confirmado' },
  { id: 2, clienteId: 2, barbeiroId: 2, servicoId: 2, data: '22/10/2025', hora: '15:15', status: 'pendente' },
  { id: 3, clienteId: 3, barbeiroId: 1, servicoId: 3, data: '22/10/2025', hora: '16:00', status: 'confirmado' },
]

function Agendamentos({ usuarioLogado }) {
  const navigate = useNavigate()
  const [agendamentos, setAgendamentos] = useState(agendamentosIniciais)
  const [clienteId, setClienteId] = useState('')
  const [barbeiroId, setBarbeiroId] = useState('')
  const [servicoId, setServicoId] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')

  useEffect(() => {
    if (!usuarioLogado) navigate('/login')
  }, [usuarioLogado, navigate])

  if (!usuarioLogado) return null

  function handleSair() {
    navigate('/login')
  }

  function handleAgendar(e) {
    e.preventDefault()
    if (!clienteId || !barbeiroId || !servicoId || !data || !hora) return
    const novo = {
      id: agendamentos.length + 1,
      clienteId: Number(clienteId),
      barbeiroId: Number(barbeiroId),
      servicoId: Number(servicoId),
      data: new Date(data).toLocaleDateString('pt-BR'),
      hora,
      status: 'pendente',
    }
    setAgendamentos([...agendamentos, novo])
    setClienteId(''); setBarbeiroId(''); setServicoId(''); setData(''); setHora('')
  }

  function handleStatus(id, status) {
    setAgendamentos(agendamentos.map(a => a.id === id ? { ...a, status } : a))
  }

  function handleRemover(id) {
    setAgendamentos(agendamentos.filter(a => a.id !== id))
  }

  function getNome(lista, id) {
    return lista.find(i => i.id === Number(id))?.nome || '-'
  }

  return (
    <div className="layout">
      <Sidebar onSair={handleSair} />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Agendamentos</h1>
            <p className="page-subtitle">Gerencie e agende novos horários para os seus clientes</p>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="form-card">
          <p className="form-card-title">Novo Agendamento Rápido</p>
          <form onSubmit={handleAgendar} className="form-grid">
            <div className="form-group">
              <label>Cliente</label>
              <select className="form-select" value={clienteId} onChange={e => setClienteId(e.target.value)} required>
                <option value="">Selecione o Cliente</option>
                {clientesSimulados.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Barbeiro</label>
              <select className="form-select" value={barbeiroId} onChange={e => setBarbeiroId(e.target.value)} required>
                <option value="">Selecione</option>
                {barbeirosSimulados.map(b => <option key={b.id} value={b.id}>{b.nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Serviço</label>
              <select className="form-select" value={servicoId} onChange={e => setServicoId(e.target.value)} required>
                <option value="">Selecione</option>
                {servicosSimulados.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Data</label>
              <input className="form-input" type="date" value={data} onChange={e => setData(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Hora</label>
              <input className="form-input" type="time" value={hora} onChange={e => setHora(e.target.value)} required />
            </div>
            <button type="submit" className="btn-agendar">Agendar</button>
          </form>
        </div>

        {/* LISTA */}
        <h2 className="lista-titulo">Todos os Agendamentos Cadastrados</h2>

        {agendamentos.length === 0 && (
          <p className="lista-vazia">Nenhum agendamento cadastrado ainda.</p>
        )}

        {agendamentos.map(a => (
          <div key={a.id} className="agendamento-card" data-status={a.status}>
            <div>
              <p className="agendamento-card-nome">
                {getNome(clientesSimulados, a.clienteId)}
                <span className={`badge badge-${a.status}`}>{a.status}</span>
              </p>
              <p className="agendamento-card-detalhe">✂️ Barbeiro: {getNome(barbeirosSimulados, a.barbeiroId)}</p>
              <p className="agendamento-card-detalhe">💈 Serviço: {getNome(servicosSimulados, a.servicoId)}</p>
            </div>
            <div className="agendamento-card-direita">
              <div>
                <p className="agendamento-card-hora">{a.hora}</p>
                <p className="agendamento-card-data">{a.data}</p>
              </div>
              <select
                className="status-select"
                value={a.status}
                onChange={e => handleStatus(a.id, e.target.value)}
              >
                <option value="pendente">Pendente</option>
                <option value="confirmado">Confirmado</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
              <button className="btn-remover" onClick={() => handleRemover(a.id)}>🗑</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Agendamentos