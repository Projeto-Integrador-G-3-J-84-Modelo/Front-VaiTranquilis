
import ListarPlanos from './pages/planos/listarplanos/ListarPlanos';
import FormPlano from './pages/planos/formplano/FormPlano';
import DeletarPlano from './pages/planos/deletarplano/DeletarPlano';
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
            <Route path="/planos" element={<ListarPlanos />} />
            <Route path="/cadastrar-plano" element={<FormPlano />} />
            <Route path="/editar-plano/:id" element={<FormPlano />} />
            <Route path="/deletar-plano/:id" element={<DeletarPlano />} />
            <Route path="/cadastrar-usuario" element={<CadastrarUsuario />} />
            <Route path="/login" element={<LoginUsuario />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}