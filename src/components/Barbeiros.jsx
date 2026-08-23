import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import { listarBarbeiros } from '../services/api'
import '../styles/dashboard.css'
import '../styles/agendamentos.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function Barbeiros({ usuarioLogado, onSair }) {
  const navigate = useNavigate()
  const [barbeiros, setBarbeiros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [nome, setNome] = useState('')
  const [especialidade, setEspecialidade] = useState('')

  useEffect(() => {
    if (!usuarioLogado) { navigate('/login'); return }
    carregar()
  }, [usuarioLogado])

  async function carregar() {
    try {
      const data = await listarBarbeiros()
      setBarbeiros(data)
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  function abrirModal(barbeiro = null) {
    setEditando(barbeiro)
    setNome(barbeiro?.nome || '')
    setEspecialidade(barbeiro?.especialidade || '')
    setModal(true)
  }

  function fecharModal() {
    setModal(false)
    setEditando(null)
    setNome(''); setEspecialidade('')
  }

  async function handleSalvar(e) {
    e.preventDefault()
    try {
      if (editando) {
        await fetch(`${API_URL}/barbeiros/${editando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, especialidade }),
        })
      } else {
        await fetch(`${API_URL}/barbeiros`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, especialidade }),
        })
      }
      fecharModal()
      await carregar()
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleRemover(id) {
    if (!confirm('Remover este barbeiro?')) return
    try {
      await fetch(`${API_URL}/barbeiros/${id}`, { method: 'DELETE' })
      await carregar()
    } catch (err) {
      alert(err.message)
    }
  }

  function handleSair() {
    onSair()
    navigate('/login')
  }

  return (
    <div className="layout">
      <Sidebar onSair={handleSair} />
      <main className="main-content">
        <div className="crud-header">
          <div>
            <h1 className="page-title">Barbeiros</h1>
            <p className="page-subtitle">Gerencie os barbeiros da equipe</p>
          </div>
          <button className="btn-novo" onClick={() => abrirModal()}>+ Novo Barbeiro</button>
        </div>

        {carregando && <p style={{ color: 'var(--muted)' }}>Carregando...</p>}
        {erro && <p style={{ color: 'var(--vermelho)' }}>{erro}</p>}

        {!carregando && !erro && (
          <div className="crud-table-card">
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Especialidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {barbeiros.length === 0 && (
                  <tr><td colSpan={3} className="tabela-vazia">Nenhum barbeiro cadastrado.</td></tr>
                )}
                {barbeiros.map(b => (
                  <tr key={b.id}>
                    <td>{b.nome}</td>
                    <td>{b.especialidade || '-'}</td>
                    <td>
                      <button className="btn-editar" onClick={() => abrirModal(b)}>Editar</button>
                      <button className="btn-remover" onClick={() => handleRemover(b.id)}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {modal && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2 className="modal-title">{editando ? 'Editar Barbeiro' : 'Novo Barbeiro'}</h2>
              <form onSubmit={handleSalvar}>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="auth-label">Nome</label>
                  <input className="form-input" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="auth-label">Especialidade</label>
                  <input className="form-input" value={especialidade} onChange={e => setEspecialidade(e.target.value)} />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancelar" onClick={fecharModal}>Cancelar</button>
                  <button type="submit" className="btn-agendar">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Barbeiros