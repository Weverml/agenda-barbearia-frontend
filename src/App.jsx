import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Login from './components/Login'
import Cadastro from './components/Cadastro'
import Home from './components/Home'
import Agendamentos from './components/Agendamentos'
import { usuariosIniciais } from './data/usuarios'

function App() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais)
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  function cadastrar(novo) {
    const proximoId = Math.max(0, ...usuarios.map(u => u.id)) + 1
    setUsuarios([...usuarios, { id: proximoId, ...novo }])
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login usuarios={usuarios} onLogin={setUsuarioLogado} />} />
        <Route path="/cadastro" element={<Cadastro usuarios={usuarios} onCadastrar={cadastrar} />} />
        <Route path="/home" element={<Home usuarioLogado={usuarioLogado} onSair={() => setUsuarioLogado(null)} />} />
        <Route path="/agendamentos" element={<Agendamentos usuarioLogado={usuarioLogado} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App