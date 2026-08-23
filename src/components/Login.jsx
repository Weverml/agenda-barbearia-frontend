import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { fazerLogin } from '../services/api'
import '../styles/auth.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      const usuario = await fazerLogin(email, senha)
      onLogin(usuario)
      navigate('/home')
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop" alt="Barbearia" />
        <div className="auth-left-content">
          <p className="auth-left-tag">Corte & Barba Premium</p>
          <h1 className="auth-left-title">A tradição encontra a conveniência moderna</h1>
          <p className="auth-left-desc">Gerencie seus horários com rapidez e precisão na plataforma de agendamento mais robusta do mercado.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-logo">
            <span>💈</span>
            <span className="auth-logo-text">AGENDA <span>BARBEARIA</span></span>
          </div>
          <p className="auth-subtitle">Acesse sua conta para continuar</p>

          <form onSubmit={handleSubmit}>
            <label className="auth-label">E-mail</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">✉</span>
              <input
                className="auth-input"
                type="email"
                placeholder="exemplo@barbearia.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <label className="auth-label">Senha</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">🔒</span>
              <input
                className="auth-input"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
            </div>

            {erro && <p className="auth-erro">{erro}</p>}
            <button type="submit" className="auth-btn" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="auth-link">
            Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login