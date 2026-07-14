import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type SeguroVida from "../../../models/SeguroVida";
import { buscarPuro, deletar } from "../../../services/Service";

function DeletarSeguro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [seguro, setSeguro] = useState<SeguroVida | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
  async function carregarDados() {
    if (!id) return;

    try {
      // 1. Busca o seguro, os usuários e os planos
      const [resSeguro, resUsuarios, resPlanos] = await Promise.all([
        buscarPuro(`/seguros/${id}`), // Crie essa função simples ou use axios direto
        buscarPuro("/usuarios"),
        buscarPuro("/planos")
      ]);

      // 2. Faz o "Join" manualmente
      const usuarioEncontrado = resUsuarios.find((u: any) => String(u.id) === String(resSeguro.usuarioId));
      const planoEncontrado = resPlanos.find((p: any) => String(p.id) === String(resSeguro.planoSeguroId));

      setSeguro({
        ...resSeguro,
        usuario: usuarioEncontrado,
        plano: planoEncontrado
      });
    } catch {
      setErro("Não foi possível carregar os dados para exclusão.");
    }
  }

  carregarDados();
}, [id]);

  async function confirmarExclusao() {
    if (!id) return;

    try {
      await deletar(`/seguros/${id}`);
      navigate("/seguros");
    } catch {
      setErro("Não foi possível excluir o seguro.");
    }
  }

  return (
    <div className="bg-fundo min-h-[calc(100vh-84px)] flex items-center justify-center px-4 py-20">
      <section className="bg-white p-10 shadow-2xl border-l-4 border-red-700 w-full max-w-lg text-center rounded-sm">
        <span className="inline-block bg-red-700/10 text-red-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest italic border border-red-700/20 mb-4">
          Excluir seguro
        </span>

        <h1 className="text-3xl font-black text-morte uppercase italic tracking-tight mb-4">
          Confirmar exclusão
        </h1>

        {erro && (
          <p className="bg-red-100 text-red-700 p-4 rounded-sm font-bold text-sm mb-6">
            {erro}
          </p>
        )}

        {seguro ? (
          <>
            <p className="text-texto/80 text-sm mb-3 max-w-sm mx-auto">
              Tem certeza que deseja apagar o seguro de{" "}
              <strong className="text-red-700">{seguro.usuario?.nome}</strong> no
              plano{" "}
              <strong className="text-red-700">
                {seguro.plano.nomePlano}
              </strong>
              ?
            </p>

            <p className="text-texto/50 text-xs italic mb-8">
              Essa ação não poderá ser desfeita.
            </p>
          </>
        ) : (
          <p className="text-xl font-bold animate-pulse text-morte py-8">
            Carregando seguro...
          </p>
        )}

        <div className="flex gap-4 max-w-xs mx-auto">
          <button
            className="flex-1 bg-red-700 text-white py-3 font-black uppercase text-xs tracking-wider hover:bg-red-800 transition-all hover:scale-105 cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            type="button"
            onClick={confirmarExclusao}
            disabled={!seguro}
          >
            Confirmar
          </button>

          <button
            className="flex-1 border-2 border-morte text-morte py-3 font-black uppercase text-xs tracking-wider hover:bg-morte hover:text-white transition-all hover:scale-105 cursor-pointer"
            type="button"
            onClick={() => navigate("/seguros")}
          >
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
}

export default DeletarSeguro;