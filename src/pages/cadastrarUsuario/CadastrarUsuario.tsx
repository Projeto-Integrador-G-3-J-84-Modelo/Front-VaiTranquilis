import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CadastrarUsuario() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    foto: '',
    dataNascimento: '',
    senha: '',
  });

  const [enviado, setEnviado] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function calcularIdade(dataNascimento: string): number | null {
    if (!dataNascimento) return null;

    const nascimento = new Date(dataNascimento);
    if (isNaN(nascimento.getTime())) return null;

    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const aniversarioJaPassouEsteAno =
      hoje.getMonth() > nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate());

    if (!aniversarioJaPassouEsteAno) {
      idade--;
    }

    return idade;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const idade = calcularIdade(form.dataNascimento);

    if (idade === null) {
      alert('Informe uma data de nascimento válida.');
      return;
    }

    if (idade < 18) {
      alert('É necessário ter 18 anos ou mais para se cadastrar.');
      return;
    }

    const payload = { ...form, idade };
    console.log(payload);
    setEnviado(true);
  }

  const idadeCalculada = calcularIdade(form.dataNascimento);

  return (
    <div className="bg-fundo min-h-screen text-texto">
      <main className="max-w-xl mx-auto px-6 py-20">

        <section className="text-center space-y-4 mb-12">
          <div className="inline-block bg-morte/10 text-morte px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest italic border border-morte/20">
            O primeiro passo é se apresentar
          </div>

          <h1 className="text-5xl font-black text-morte uppercase italic leading-none tracking-tighter">
            Quem vai <br /> partir?
          </h1>

          <p className="text-base text-texto/70 max-w-sm mx-auto border-b-2 border-morte/20 pb-6">
            Precisamos saber quem você é antes de garantir sua tranquilidade eterna.
          </p>
        </section>

        <div className="bg-white border-l-4 border-vida shadow-xl p-8 space-y-6">

          {enviado ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-5xl">⚰️</div>
              <p className="font-black text-morte text-xl uppercase tracking-tight">
                Cadastro realizado.
              </p>
              <p className="text-sm text-texto/60 italic">
                Bem-vindo à família VaiTranquilis. Agora pode descansar.
              </p>
          <Link
  to="/planos"
  className="inline-block mt-4 bg-vida text-white px-8 py-3 text-sm font-black uppercase rounded-sm hover:bg-morte transition-all hover:scale-105 shadow-md border-b-4 border-morte/20"
>
  Ver planos
</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-morte">
                  Nome completo
                </label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Como você quer ser lembrado"
                  required
                  className="w-full border-b-2 border-morte/30 bg-transparent py-2 text-sm text-texto placeholder:text-texto/30 focus:outline-none focus:border-morte transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-morte">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Para o contrato e newsletter do além"
                  required
                  className="w-full border-b-2 border-morte/30 bg-transparent py-2 text-sm text-texto placeholder:text-texto/30 focus:outline-none focus:border-morte transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-morte">
                  Foto
                </label>
                <input
                  type="url"
                  name="foto"
                  value={form.foto}
                  onChange={handleChange}
                  placeholder="Para a lápde (opcional)"
                  className="w-full border-b-2 border-morte/30 bg-transparent py-2 text-sm text-texto placeholder:text-texto/30 focus:outline-none focus:border-morte transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-morte">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={form.dataNascimento}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full border-b-2 border-morte/30 bg-transparent py-2 text-sm text-texto placeholder:text-texto/30 focus:outline-none focus:border-morte transition-colors"
                />
                {idadeCalculada !== null && (
                  <p className="text-xs text-texto/50 italic pt-1">
                    Idade calculada: {idadeCalculada} anos
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-morte">
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="Algo que você vai levar pro túmulo"
                  required
                  minLength={6}
                  className="w-full border-b-2 border-morte/30 bg-transparent py-2 text-sm text-texto placeholder:text-texto/30 focus:outline-none focus:border-morte transition-colors"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-vida text-white py-4 text-sm font-black uppercase rounded-sm hover:bg-morte transition-all hover:scale-[1.02] shadow-lg border-b-4 border-yellow-900"
                >
                  Cadastrar — enquanto ainda dá tempo
                </button>
              </div>

              <p className="text-center text-xs text-texto/40 italic pt-2">
                * Ao se cadastrar, você concorda que a morte é inevitável.
              </p>
            </form>
          )}
        </div>

            <p className="text-center text-lg text-texto/60 pt-4">
              Já se preparou?{' '}
            <a href="/login" className="font-black text-morte uppercase text-lg tracking-widest hover:text-vida transition-colors">
              Entrar
            </a>
              </p>

        <div className="text-center mt-8">
          <a href="/" className="text-xs font-bold uppercase tracking-widest text-morte/50 hover:text-morte transition-colors">
            ← Voltar para a home
          </a>
        </div>

      </main>
    </div>
  );
}