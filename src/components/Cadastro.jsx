import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import '../styles/auth.css'

function Cadastro({ usuarios, onCadastrar }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    if (!nome || !email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }
    if (usuarios.some(u => u.email === email)) {
      setErro('Este e-mail já está cadastrado.')
      return
    }
    onCadastrar({ nome, email, senha })
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop" alt="Barbearia" />
        <div className="auth-left-content">
          <p className="auth-left-tag">Torne-se membro</p>
          <h1 className="auth-left-title">Sua agenda nas mãos dos especialistas</h1>
          <p className="auth-left-desc">Cadastre-se hoje mesmo para otimizar os atendimentos da sua barbearia de forma elegante e inteligente.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-logo">
            <span>💈</span>
            <span className="auth-logo-text">AGENDA <span>BARBEARIA</span></span>
          </div>
          <p className="auth-subtitle">Crie sua conta administrativa</p>

          <form onSubmit={handleSubmit}>
            <label className="auth-label">Nome Completo</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">👤</span>
              <input
                className="auth-input"
                type="text"
                placeholder="Rafael Silva"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
              />
            </div>

            <label className="auth-label">E-mail</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">✉</span>
              <input
                className="auth-input"
                type="email"
                placeholder="rafael@barbearia.com"
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
                placeholder="Crie uma senha forte"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
            </div>

            {erro && <p className="auth-erro">{erro}</p>}
            <button type="submit" className="auth-btn">Cadastrar</button>
          </form>

          <div className="auth-link">
            Já tem conta? <Link to="/login">Entrar</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastro