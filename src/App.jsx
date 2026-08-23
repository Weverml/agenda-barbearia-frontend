import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Login from './components/Login'
import Cadastro from './components/Cadastro'
import Home from './components/Home'
import Agendamentos from './components/Agendamentos'
import Clientes from './components/Clientes'
import Barbeiros from './components/Barbeiros'
import Servicos from './components/Servicos'

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={setUsuarioLogado} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home usuarioLogado={usuarioLogado} onSair={() => setUsuarioLogado(null)} />} />
        <Route path="/clientes" element={<Clientes usuarioLogado={usuarioLogado} onSair={() => setUsuarioLogado(null)} />} />
        <Route path="/barbeiros" element={<Barbeiros usuarioLogado={usuarioLogado} onSair={() => setUsuarioLogado(null)} />} />
        <Route path="/servicos" element={<Servicos usuarioLogado={usuarioLogado} onSair={() => setUsuarioLogado(null)} />} />
        <Route path="/agendamentos" element={<Agendamentos usuarioLogado={usuarioLogado} onSair={() => setUsuarioLogado(null)} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App