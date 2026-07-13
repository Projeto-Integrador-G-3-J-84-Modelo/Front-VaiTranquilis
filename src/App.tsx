import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/footer/Footer'
import Home from './pages/home/Home'
import CadastrarUsuario from './pages/cadastrarUsuario/CadastrarUsuario'
import LoginUsuario from './pages/loginUsuario/LoginUsuario'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrar-usuario" element={<CadastrarUsuario />} />
            <Route path="/login" element={<LoginUsuario />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}