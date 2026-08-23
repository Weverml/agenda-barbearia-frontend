import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import { listarServicos } from '../services/api'
import '../styles/dashboard.css'
import '../styles/agendamentos.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function Servicos({ usuarioLogado, onSair }) {
  const navigate = useNavigate()
  const [servicos, setServicos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [duracaoMin, setDuracaoMin] = useState('')

  useEffect(() => {
    if (!usuarioLogado) { navigate('/login'); return }
    carregar()
  }, [usuarioLogado])

  async function carregar() {
    try {
      const data = await listarServicos()
      setServicos(data)
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  function abrirModal(servico = null) {
    setEditando(servico)
    setNome(servico?.nome || '')
    setPreco(servico?.preco || '')
    setDuracaoMin(servico?.duracao_min || '')
    setModal(true)
  }

  function fecharModal() {
    setModal(false)
    setEditando(null)
    setNome(''); setPreco(''); setDuracaoMin('')
  }

  async function handleSalvar(e) {
    e.preventDefault()
    try {
      if (editando) {
        await fetch(`${API_URL}/servicos/${editando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, preco: Number(preco), duracaoMin: Number(duracaoMin) }),
        })
      } else {
        await fetch(`${API_URL}/servicos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, preco: Number(preco), duracaoMin: Number(duracaoMin) }),
        })
      }
      fecharModal()
      await carregar()
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleRemover(id) {
    if (!confirm('Remover este serviço?')) return
    try {
      await fetch(`${API_URL}/servicos/${id}`, { method: 'DELETE' })
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
            <h1 className="page-title">Serviços</h1>
            <p className="page-subtitle">Gerencie os serviços oferecidos</p>
          </div>
          <button className="btn-novo" onClick={() => abrirModal()}>+ Novo Serviço</button>
        </div>

        {carregando && <p style={{ color: 'var(--muted)' }}>Carregando...</p>}
        {erro && <p style={{ color: 'var(--vermelho)' }}>{erro}</p>}

        {!carregando && !erro && (
          <div className="crud-table-card">
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Duração</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {servicos.length === 0 && (
                  <tr><td colSpan={4} className="tabela-vazia">Nenhum serviço cadastrado.</td></tr>
                )}
                {servicos.map(s => (
                  <tr key={s.id}>
                    <td>{s.nome}</td>
                    <td>R$ {Number(s.preco).toFixed(2)}</td>
                    <td>{s.duracao_min} min</td>
                    <td>
                      <button className="btn-editar" onClick={() => abrirModal(s)}>Editar</button>
                      <button className="btn-remover" onClick={() => handleRemover(s.id)}>🗑</button>
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
              <h2 className="modal-title">{editando ? 'Editar Serviço' : 'Novo Serviço'}</h2>
              <form onSubmit={handleSalvar}>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="auth-label">Nome</label>
                  <input className="form-input" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="auth-label">Preço (R$)</label>
                  <input className="form-input" type="number" value={preco} onChange={e => setPreco(e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="auth-label">Duração (min)</label>
                  <input className="form-input" type="number" value={duracaoMin} onChange={e => setDuracaoMin(e.target.value)} required />
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

export default Servicos