import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import Home from "./pages/home/Home";
import CadastrarUsuario from "./pages/cadastrarUsuario/CadastrarUsuario";
import LoginUsuario from "./pages/loginUsuario/LoginUsuario";

import ListarSeguros from "./components/segurovida/listarseguros/ListarSeguros";
import FormSeguro from "./components/segurovida/formseguro/FormSeguro";
import DeletarSeguro from "./components/segurovida/deletarseguro/DeletarSeguro";

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

            <Route path="/seguros" element={<ListarSeguros />} />
            <Route path="/cadastrarSeguro" element={<FormSeguro />} />
            <Route path="/editarSeguro/:id" element={<FormSeguro />} />
            <Route path="/deletarSeguro/:id" element={<DeletarSeguro />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}