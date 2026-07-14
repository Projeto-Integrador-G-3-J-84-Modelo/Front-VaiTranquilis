import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type PlanoSeguro from "../../../models/PlanoSeguro";
import type SeguroVida from "../../../models/SeguroVida";
import type Usuario from "../../../models/Usuario";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormSeguro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [planos, setPlanos] = useState<PlanoSeguro[]>([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [planoId, setPlanoId] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        await buscar<Usuario[]>("/usuarios", setUsuarios);
        await buscar<PlanoSeguro[]>("/planos", setPlanos);

        if (id) {
          // Buscamos o seguro puro do banco
          await buscar<any>(`/seguros/${id}`, (seguro) => {
            // Acessamos os campos IDs que estão no banco
            setUsuarioId(String(seguro.usuarioId));
            setPlanoId(String(seguro.planoSeguroId));
          });
        }
      } catch {
        setErro("Não foi possível carregar os dados do formulário.");
      }
    }
    carregarDados();
  }, [id]);

  function atualizarUsuario(evento: ChangeEvent<HTMLSelectElement>) {
    setUsuarioId(evento.target.value);
  }

  function atualizarPlano(evento: ChangeEvent<HTMLSelectElement>) {
    setPlanoId(evento.target.value);
  }

  async function salvarSeguro(evento: FormEvent<HTMLFormElement>) {
  evento.preventDefault();
  setErro("");

  if (!usuarioId || !planoId) {
    setErro("Selecione um usuário e um plano.");
    return;
  }

  // 1. Encontre o plano selecionado na sua lista de planos
  const planoSelecionado = planos.find(p => String(p.id) === planoId);

  // 2. Defina o valor (ou use uma regra de cálculo baseada no plano)
  const valorDefinido = planoSelecionado ? 600 : 0; // Ajuste sua lógica aqui!

  const seguro = {
    id: editando ? String(id) : String(Date.now()),
    usuarioId: String(usuarioId),
    planoSeguroId: String(planoId),
    valorMensalidade: valorDefinido, // Usa o valor real aqui
    dataContratacao: new Date().toISOString().split('T')[0]
  };

  try {
    if (editando) {
      await atualizar<typeof seguro, SeguroVida>(`/seguros/${id}`, seguro, () => {});
    } else {
      await cadastrar<typeof seguro, SeguroVida>("/seguros", seguro, () => {});
    }
    navigate("/seguros");
  } catch {
    setErro("Não foi possível salvar.");
  }
}

  return (
    <div className="bg-fundo min-h-[calc(100vh-84px)] text-texto flex items-center justify-center py-20 px-4">
      <section className="bg-white p-8 shadow-xl border-l-4 border-vida w-full max-w-md">
        <span className="inline-block bg-morte/10 text-morte px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest italic border border-morte/20 mb-4">
          {editando ? "Editar seguro" : "Novo seguro"}
        </span>

        <h1 className="text-3xl font-black text-morte uppercase italic mb-6 border-b-2 border-morte/10 pb-2">
          {editando ? "Editar Seguro" : "Cadastrar Seguro"}
        </h1>

        <form className="space-y-4" onSubmit={salvarSeguro}>
          {erro && (
            <p className="bg-red-100 text-red-700 p-4 rounded-sm font-bold text-sm">
              {erro}
            </p>
          )}

          <div>
            <label
              className="block text-xs uppercase font-black text-morte mb-1"
              htmlFor="usuario"
            >
              Usuário
            </label>

            <select
              className="w-full border-2 border-morte/20 p-2 rounded-sm focus:border-vida outline-none bg-white"
              id="usuario"
              value={usuarioId}
              onChange={atualizarUsuario}
              required
            >
              <option value="">Selecione um usuário</option>

              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-xs uppercase font-black text-morte mb-1"
              htmlFor="plano"
            >
              Plano Seguro
            </label>

            <select
              className="w-full border-2 border-morte/20 p-2 rounded-sm focus:border-vida outline-none bg-white"
              id="plano"
              value={planoId}
              onChange={atualizarPlano}
              required
            >
              <option value="">Selecione um plano</option>

              {planos.map((plano) => (
                <option key={plano.id} value={plano.id}>
                  {plano.nomePlano}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-morte/5 border border-morte/10 p-4 text-xs text-texto/70 italic">
            A mensalidade será calculada automaticamente com base na cobertura
            máxima do plano escolhido.
          </div>

          <div className="flex gap-3 pt-4">
            <button
              className="flex-1 bg-vida text-white py-3 font-black uppercase text-sm hover:bg-morte transition-all hover:scale-105 cursor-pointer shadow-md"
              type="submit"
            >
              {editando ? "Salvar Alterações" : "Cadastrar"}
            </button>

            <button
              className="flex-1 border-2 border-morte text-morte py-3 font-black uppercase text-sm hover:bg-morte hover:text-white transition-all hover:scale-105 cursor-pointer"
              type="button"
              onClick={() => navigate("/seguros")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default FormSeguro;