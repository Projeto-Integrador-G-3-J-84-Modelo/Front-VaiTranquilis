import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardSeguro from "../cardseguro/CardSeguro";
import type SeguroVida from "../../../models/SeguroVida";
import { buscar } from "../../../services/Service";

function ListarSeguros() {
  const [seguros, setSeguros] = useState<SeguroVida[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarSeguros() {
      try {
        await buscar<SeguroVida[]>("/seguros", setSeguros);
      } catch {
        setErro("Não foi possível carregar os seguros.");
      } finally {
        setCarregando(false);
      }
    }

    carregarSeguros();
  }, []);

  if (carregando) {
    return (
      <div className="bg-fundo min-h-screen text-texto">
        <main className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-xl font-bold animate-pulse text-morte text-center">
            Carregando seguros contratados...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-fundo min-h-screen text-texto">
      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block bg-morte/10 text-morte px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 italic border border-morte/20">
            Seguros contratados
          </div>

          <h1 className="text-5xl font-black text-morte uppercase italic tracking-tighter">
            Lista de Seguros
          </h1>

          <p className="text-xl text-texto/80 max-w-2xl mx-auto border-b-2 border-morte pb-6">
            Veja quais usuários já estão vinculados a um plano de proteção.
          </p>

          <Link
            className="inline-block bg-vida text-white px-8 py-4 text-sm font-black uppercase rounded-sm hover:bg-morte transition-all hover:scale-105 shadow-lg border-b-4 border-green-800 no-underline"
            to="/cadastrarSeguro">

            Cadastrar Seguro
          </Link>
        </div>

        {erro && (
          <p className="bg-red-100 text-red-700 p-4 rounded-sm font-bold text-sm text-center mb-8">
            {erro}
          </p>
        )}

        {seguros.length === 0 && !erro ? (
          <p className="text-center text-texto/60 italic">
            Nenhum seguro cadastrado ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seguros.map((seguro) => (
              <CardSeguro key={seguro.id} seguro={seguro} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ListarSeguros;