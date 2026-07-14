import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { buscarPuro } from '../../services/Service'; // Trocado para buscarPuro por segurança assíncrona
import type Usuario from '../../models/Usuario';
import { ToastAlerta } from '../../utils/ToastAlerta'; // Ajuste o caminho da pasta onde salvou seu arquivo de toast

export default function LoginUsuario() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (erro) setErro('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      // 1. Busca todos os usuários do JSON Server usando o retorno direto seguro
      const listaUsuarios: Usuario[] = await buscarPuro('/usuarios');

      // Garantia caso o servidor retorne um valor inválido ou nulo
      const usuariosValidos = Array.isArray(listaUsuarios) ? listaUsuarios : [];

      // 2. Verifica se existe algum usuário com o e-mail e senha informados
      const usuarioAutenticado = usuariosValidos.find(
        (user) => user.email === form.email && user.senha === form.senha
      );

      if (usuarioAutenticado) {
        console.log("Login realizado:", usuarioAutenticado);

        // Dispara o toast de sucesso
        ToastAlerta('Login efetuado com sucesso! Seja bem-vindo.', 'sucesso');

        navigate('/planos'); // Redireciona
      } else {
        const mensagemErro = 'E-mail ou senha incorretos.';
        setErro(mensagemErro);
        ToastAlerta(mensagemErro, 'erro'); // Dispara o toast de erro
      }
    } catch (err) {
      const mensagemConexao = 'Erro ao conectar com o servidor.';
      setErro(mensagemConexao);
      ToastAlerta(mensagemConexao, 'erro'); // Dispara o toast de erro de conexão
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="bg-fundo min-h-screen text-texto">
      <main className="max-w-xl mx-auto px-6 py-20">
        <section className="text-center space-y-4 mb-12">
          <div className="inline-block bg-morte/10 text-morte px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest italic border border-morte/20">
            Já garantiu sua tranquilidade
          </div>
          <h1 className="text-5xl font-black text-morte uppercase italic leading-none tracking-tighter">
            Que bom <br /> te ver <br /> por aqui
          </h1>
          <p className="text-base text-texto/70 max-w-sm mx-auto border-b-2 border-morte/20 pb-6">
            Por enquanto.
          </p>
        </section>

        <div className="bg-white border-l-4 border-vida shadow-xl p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm">
                {erro}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-morte">E-mail</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-morte/30 bg-transparent py-2 text-sm text-texto placeholder:text-texto/30 focus:outline-none focus:border-morte transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-morte">Senha</label>
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-morte/30 bg-transparent py-2 text-sm text-texto placeholder:text-texto/30 focus:outline-none focus:border-morte transition-colors"
              />
            </div>

            <div className="text-right">
              <Link
                to="/esqueci-senha"
                className="text-xs font-bold uppercase tracking-widest text-morte/50 hover:text-morte transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-vida text-white py-4 text-sm font-black uppercase rounded-sm hover:bg-morte transition-all hover:scale-[1.02] shadow-lg border-b-4 border-yellow-900 disabled:opacity-60 disabled:hover:scale-100"
              >
                {carregando ? 'Entrando...' : 'Entrar'}
              </button>
            </div>

            <p className="text-center text-xs text-texto/40 italic pt-2">
              * A tranquilidade eterna aguarda do outro lado.
            </p>
          </form>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-xs font-bold uppercase tracking-widest text-morte/50 hover:text-morte transition-colors">
            ← Voltar para a home
          </Link>
        </div>
      </main>
    </div>
  );
}
