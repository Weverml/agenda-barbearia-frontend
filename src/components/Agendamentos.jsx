import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import {
  listarAgendamentos,
  listarClientes,
  listarBarbeiros,
  listarServicos,
  criarAgendamento,
  atualizarAgendamento,
  removerAgendamento,
} from '../services/api'
import '../styles/dashboard.css'
import '../styles/agendamentos.css'

function Agendamentos({ usuarioLogado, onSair }) {
  const navigate = useNavigate()
  const [agendamentos, setAgendamentos] = useState([])
  const [clientes, setClientes] = useState([])
  const [barbeiros, setBarbeiros] = useState([])
  const [servicos, setServicos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [clienteId, setClienteId] = useState('')
  const [barbeiroId, setBarbeiroId] = useState('')
  const [servicoId, setServicoId] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')

  useEffect(() => {
    if (!usuarioLogado) { navigate('/login'); return }
    carregarTudo()
  }, [usuarioLogado, navigate])

  async function carregarTudo() {
    try {
      const [ags, cls, bars, servs] = await Promise.all([
        listarAgendamentos(),
        listarClientes(),
        listarBarbeiros(),
        listarServicos(),
      ])
      setAgendamentos(ags)
      setClientes(cls)
      setBarbeiros(bars)
      setServicos(servs)
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  async function handleAgendar(e) {
    e.preventDefault()
    try {
      await criarAgendamento({ clienteId, barbeiroId, servicoId, data, hora })
      setClienteId(''); setBarbeiroId(''); setServicoId(''); setData(''); setHora('')
      await carregarTudo()
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleStatus(id, status) {
    try {
      await atualizarAgendamento(id, { status })
      await carregarTudo()
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleRemover(id) {
    try {
      await removerAgendamento(id)
      await carregarTudo()
    } catch (err) {
      alert(err.message)
    }
  }

  function getNome(lista, id) {
    return lista.find(i => i.id === Number(id))?.nome || '-'
  }

  function handleSair() {
    onSair()
    navigate('/login')
  }

  if (!usuarioLogado) return null

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

        <div className="form-card">
          <p className="form-card-title">Novo Agendamento Rápido</p>
          <form onSubmit={handleAgendar} className="form-grid">
            <div className="form-group">
              <label>Cliente</label>
              <select className="form-select" value={clienteId} onChange={e => setClienteId(e.target.value)} required>
                <option value="">Selecione</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Barbeiro</label>
              <select className="form-select" value={barbeiroId} onChange={e => setBarbeiroId(e.target.value)} required>
                <option value="">Selecione</option>
                {barbeiros.map(b => <option key={b.id} value={b.id}>{b.nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Serviço</label>
              <select className="form-select" value={servicoId} onChange={e => setServicoId(e.target.value)} required>
                <option value="">Selecione</option>
                {servicos.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
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

        {carregando && <p style={{ color: 'var(--muted)' }}>Carregando...</p>}
        {erro && <p style={{ color: 'var(--vermelho)' }}>{erro}</p>}

        {!carregando && !erro && (
          <>
            <h2 className="lista-titulo">Todos os Agendamentos Cadastrados</h2>

            {agendamentos.length === 0 && (
              <p className="lista-vazia">Nenhum agendamento cadastrado ainda.</p>
            )}

            {agendamentos.map(a => (
              <div key={a.id} className="agendamento-card" data-status={a.status}>
                <div>
                  <p className="agendamento-card-nome">
                    {getNome(clientes, a.clienteId)}
                    <span className={`badge badge-${a.status}`}>{a.status}</span>
                  </p>
                  <p className="agendamento-card-detalhe">✂️ Barbeiro: {getNome(barbeiros, a.barbeiroId)}</p>
                  <p className="agendamento-card-detalhe">💈 Serviço: {getNome(servicos, a.servicoId)}</p>
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
          </>
        )}
      </main>
    </div>
  )
}

export default Agendamentos