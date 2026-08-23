import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import { listarAgendamentos, listarClientes, listarBarbeiros, listarServicos } from '../services/api'
import '../styles/dashboard.css'

function Home({ usuarioLogado, onSair }) {
  const navigate = useNavigate()
  const [agendamentos, setAgendamentos] = useState([])
  const [clientes, setClientes] = useState([])
  const [barbeiros, setBarbeiros] = useState([])
  const [servicos, setServicos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!usuarioLogado) { navigate('/login'); return }

    Promise.all([
      listarAgendamentos(),
      listarClientes(),
      listarBarbeiros(),
      listarServicos(),
    ])
      .then(([ags, cls, bars, servs]) => {
        setAgendamentos(ags)
        setClientes(cls)
        setBarbeiros(bars)
        setServicos(servs)
      })
      .catch(err => setErro(err.message))
      .finally(() => setCarregando(false))
  }, [usuarioLogado, navigate])

  if (!usuarioLogado) return null

  const iniciais = usuarioLogado.nome
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  function getNome(lista, id) {
    return lista.find(i => i.id === Number(id))?.nome || '-'
  }

  function handleSair() {
    onSair()
    navigate('/login')
  }

  return (
    <div className="layout">
      <Sidebar onSair={handleSair} />
      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-greeting">Olá, {usuarioLogado.nome.split(' ')[0]}! 👋</h1>
            <p className="dashboard-date">{hoje.charAt(0).toUpperCase() + hoje.slice(1)}</p>
          </div>
          <div className="dashboard-user">
            <span>{usuarioLogado.nome}</span>
            <div className="dashboard-avatar">{iniciais}</div>
          </div>
        </div>

        {carregando && <p style={{ color: 'var(--muted)' }}>Carregando...</p>}
        {erro && <p style={{ color: 'var(--vermelho)' }}>{erro}</p>}

        {!carregando && !erro && (
          <>
            <div className="resumo-grid">
              <div className="resumo-card">
                <div>
                  <p className="resumo-label">Clientes Cadastrados</p>
                  <p className="resumo-numero">{clientes.length}</p>
                </div>
                <span className="resumo-icon">👥</span>
              </div>
              <div className="resumo-card">
                <div>
                  <p className="resumo-label">Barbeiros Ativos</p>
                  <p className="resumo-numero">{barbeiros.length}</p>
                </div>
                <span className="resumo-icon">✂️</span>
              </div>
              <div className="resumo-card">
                <div>
                  <p className="resumo-label">Serviços Oferecidos</p>
                  <p className="resumo-numero">{servicos.length}</p>
                </div>
                <span className="resumo-icon">💈</span>
              </div>
              <div className="resumo-card">
                <div>
                  <p className="resumo-label">Agendamentos Hoje</p>
                  <p className="resumo-numero">{agendamentos.length}</p>
                </div>
                <span className="resumo-icon">📅</span>
              </div>
            </div>

            <div className="section-header">
              <h2 className="section-title">Próximos Agendamentos</h2>
            </div>

            {agendamentos.length === 0 && (
              <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Nenhum agendamento cadastrado.</p>
            )}

            {agendamentos.map(a => (
              <div key={a.id} className="agendamento-item" data-status={a.status}>
                <div>
                  <p className="agendamento-nome">
                    {getNome(clientes, a.clienteId)}
                    <span className={`badge badge-${a.status}`}>{a.status}</span>
                  </p>
                  <p className="agendamento-detalhe">✂️ Barbeiro: {getNome(barbeiros, a.barbeiroId)} &nbsp;💈 Serviço: {getNome(servicos, a.servicoId)}</p>
                </div>
                <div className="agendamento-direita">
                  <p className="agendamento-hora">{a.hora}</p>
                  <p className="agendamento-dia">{a.data}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  )
}

export default Home