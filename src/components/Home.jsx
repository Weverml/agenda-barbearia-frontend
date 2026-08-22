import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import '../styles/dashboard.css'

const agendamentosSimulados = [
  { id: 1, cliente: 'Carlos Eduardo', barbeiro: 'Marcos Oliveira', servico: 'Corte Degradê & Barba', hora: '14:30', status: 'confirmado' },
  { id: 2, cliente: 'Fernando Henrique', barbeiro: 'Lucas Souza', servico: 'Corte Social Premium', hora: '15:15', status: 'pendente' },
  { id: 3, cliente: 'Alexandre Pires', barbeiro: 'Marcos Oliveira', servico: 'Grooming Barba Completa', hora: '16:00', status: 'confirmado' },
  { id: 4, cliente: 'Maurício Santana', barbeiro: 'Guilherme Reis', servico: 'Corte Clássico', hora: '17:30', status: 'cancelado' },
]

function Home({ usuarioLogado, onSair }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!usuarioLogado) navigate('/login')
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

        <div className="resumo-grid">
          <div className="resumo-card">
            <div>
              <p className="resumo-label">Clientes Cadastrados</p>
              <p className="resumo-numero">127</p>
            </div>
            <span className="resumo-icon">👥</span>
          </div>
          <div className="resumo-card">
            <div>
              <p className="resumo-label">Barbeiros Ativos</p>
              <p className="resumo-numero">8</p>
            </div>
            <span className="resumo-icon">✂️</span>
          </div>
          <div className="resumo-card">
            <div>
              <p className="resumo-label">Serviços Oferecidos</p>
              <p className="resumo-numero">15</p>
            </div>
            <span className="resumo-icon">💈</span>
          </div>
          <div className="resumo-card">
            <div>
              <p className="resumo-label">Agendamentos Hoje</p>
              <p className="resumo-numero">12</p>
            </div>
            <span className="resumo-icon">📅</span>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Próximos Agendamentos</h2>
        </div>

        {agendamentosSimulados.map(a => (
          <div key={a.id} className="agendamento-item" data-status={a.status}>
            <div>
              <p className="agendamento-nome">
                {a.cliente}
                <span className={`badge badge-${a.status}`}>{a.status}</span>
              </p>
              <p className="agendamento-detalhe">✂️ Barbeiro: {a.barbeiro} &nbsp;💈 Serviço: {a.servico}</p>
            </div>
            <div className="agendamento-direita">
              <p className="agendamento-hora">{a.hora}</p>
              <p className="agendamento-dia">Hoje</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Home