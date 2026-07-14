import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarPuro } from "../../services/Service";

interface Seguro {
  id: number;
  nome: string;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  foto: string;
  idade: number;
  seguros?: Seguro[];
}

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
  async function carregarPerfil() {
  const id = localStorage.getItem("usuarioId");
  if (!id) return;

  try {
    // 1. Busca usuário, todos os seguros e todos os planos de uma vez
    const [resUsuario, resSeguros, resPlanos] = await Promise.all([
      buscarPuro(`/usuarios/${id}`),
      buscarPuro("/seguros"),
      buscarPuro("/planos")
    ]);

    // 2. Filtra seguros deste usuário e faz o "join" com o nome do plano
    const segurosComDetalhes = resSeguros
      .filter((s: any) => String(s.usuarioId) === String(id))
      .map((s: any) => {
        const plano = resPlanos.find((p: any) => String(p.id) === String(s.planoSeguroId));
        return {
          id: s.id,
          nome: plano ? plano.nomePlano : "Seguro sem plano" // Pega o nome do plano
        };
      });

    setUsuario({ ...resUsuario, seguros: segurosComDetalhes });
  } catch {
    console.error("Erro ao carregar dados");
  }
}
  carregarPerfil();
}, [navigate]);

  if (!usuario) return <div className="text-center py-20 font-black">CARREGANDO...</div>;

  return (
    <div className="bg-[#f5f0eb] min-h-screen flex flex-col items-center py-10 text-[#3d2b1f]">
      {/* Cabeçalho */}
      <div className="border border-[#3d2b1f] rounded-full px-6 py-1 text-xs font-bold uppercase tracking-widest mb-4">
        Ainda por aqui
      </div>
      <h1 className="text-5xl font-black uppercase text-center mb-10 leading-none">
        Olá, <br /> {usuario.nome}
      </h1>

      {/* Card Principal */}
      <div className="bg-white w-full max-w-lg p-10 border-l-8 border-[#3d2b1f] shadow-2xl">
        <div className="flex justify-center mb-8">
          <img src={usuario.foto} alt={usuario.nome} className="w-28 h-28 rounded-full border-2 border-[#3d2b1f] object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-1">Nome</p>
            <p className="text-lg font-medium border-b border-[#3d2b1f] pb-2">{usuario.nome}</p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-1">E-mail</p>
            <p className="text-lg font-medium border-b border-[#3d2b1f] pb-2">{usuario.email}</p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-3">Meus seguros</p>
            <div className="space-y-2">
              {usuario.seguros && usuario.seguros.length > 0 ? (
                usuario.seguros.map((s) => (
                  <p key={s.id} className="text-lg font-medium border-b border-[#3d2b1f] pb-2">
                    {s.nome}
                  </p>
                ))
              ) : (
                <p className="text-sm italic text-gray-500">Nenhum seguro contratado.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botão Sair */}
      <button
        onClick={() => { localStorage.removeItem("usuarioId"); navigate("/"); }}
        className="mt-10 font-black uppercase tracking-widest text-sm hover:underline"
      >
        Sair da conta
      </button>
    </div>
  );
}