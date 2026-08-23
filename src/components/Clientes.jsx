import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import { listarClientes } from '../services/api'
import '../styles/dashboard.css'
import '../styles/agendamentos.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function Clientes({ usuarioLogado, onSair }) {
  const navigate = useNavigate()
  const [clientes, setClientes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!usuarioLogado) { navigate('/login'); return }
    carregar()
  }, [usuarioLogado])

  async function carregar() {
    try {
      const data = await listarClientes()
      setClientes(data)
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  function abrirModal(cliente = null) {
    setEditando(cliente)
    setNome(cliente?.nome || '')
    setTelefone(cliente?.telefone || '')
    setEmail(cliente?.email || '')
    setModal(true)
  }

  function fecharModal() {
    setModal(false)
    setEditando(null)
    setNome(''); setTelefone(''); setEmail('')
  }

  async function handleSalvar(e) {
    e.preventDefault()
    try {
      if (editando) {
        await fetch(`${API_URL}/clientes/${editando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, telefone, email }),
        })
      } else {
        await fetch(`${API_URL}/clientes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, telefone, email }),
        })
      }
      fecharModal()
      await carregar()
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleRemover(id) {
    if (!confirm('Remover este cliente?')) return
    try {
      await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' })
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
            <h1 className="page-title">Clientes</h1>
            <p className="page-subtitle">Gerencie os clientes da barbearia</p>
          </div>
          <button className="btn-novo" onClick={() => abrirModal()}>+ Novo Cliente</button>
        </div>

        {carregando && <p style={{ color: 'var(--muted)' }}>Carregando...</p>}
        {erro && <p style={{ color: 'var(--vermelho)' }}>{erro}</p>}

        {!carregando && !erro && (
          <div className="crud-table-card">
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.length === 0 && (
                  <tr><td colSpan={4} className="tabela-vazia">Nenhum cliente cadastrado.</td></tr>
                )}
                {clientes.map(c => (
                  <tr key={c.id}>
                    <td>{c.nome}</td>
                    <td>{c.telefone}</td>
                    <td>{c.email || '-'}</td>
                    <td>
                      <button className="btn-editar" onClick={() => abrirModal(c)}>Editar</button>
                      <button className="btn-remover" onClick={() => handleRemover(c.id)}>🗑</button>
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
              <h2 className="modal-title">{editando ? 'Editar Cliente' : 'Novo Cliente'}</h2>
              <form onSubmit={handleSalvar}>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="auth-label">Nome</label>
                  <input className="form-input" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="auth-label">Telefone</label>
                  <input className="form-input" value={telefone} onChange={e => setTelefone(e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="auth-label">Email (opcional)</label>
                  <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
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

export default Clientes