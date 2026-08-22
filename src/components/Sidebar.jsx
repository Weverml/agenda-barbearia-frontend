import { useNavigate, useLocation } from 'react-router'

const menuItems = [
  { icon: '📊', label: 'Dashboard', path: '/home' },
  { icon: '👥', label: 'Clientes', path: '/clientes' },
  { icon: '✂️', label: 'Barbeiros', path: '/barbeiros' },
  { icon: '💈', label: 'Serviços', path: '/servicos' },
  { icon: '📅', label: 'Agendamentos', path: '/agendamentos' },
]

function Sidebar({ onSair }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>💈</span>
        <span className="sidebar-logo-text">AGENDA <span>BARBEARIA</span></span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-sair" onClick={onSair}>
          <span className="sidebar-link-icon">🚪</span>
          Sair
        </button>
      </div>
    </aside>
  )
}

export default Sidebar