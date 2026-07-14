import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deletar, buscar } from '../../../services/Service';
import type PlanoSeguro from '../../../models/PlanoSeguro';

export default function DeletarPlano() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [nomePlano, setNomePlano] = useState<string>('');

  useEffect(() => {
    if (id) {
      buscar<PlanoSeguro>(`/planos/${id}`, (plano) => {
        setNomePlano(plano.nomePlano);
      });
    }
  }, [id]);

  const handleConfirmar = async () => {
    try {
      await deletar(`/planos/${id}`);
      alert("Plano excluído com sucesso!");
      navigate('/planos');
    } catch (error) {
      console.error("Erro ao excluir o plano:", error);
      alert("Erro ao excluir o plano.");
    }
  };

  return (
    <div className="bg-fundo min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-10 shadow-2xl border-l-4 border-red-700 w-full max-w-lg text-center rounded-sm">
        <h3 className="text-3xl font-black text-morte uppercase italic tracking-tight mb-4">
          Excluir Plano?
        </h3>
        <p className="text-texto/80 text-sm mb-8 max-w-sm mx-auto">
          Tem certeza que deseja apagar o plano <span className="font-bold text-red-700">{nomePlano || '...'}</span>? Esta ação não poderá ser desfeita.
        </p>
        <div className="flex gap-4 max-w-xs mx-auto">
          <button
            onClick={handleConfirmar}
            className="flex-1 bg-red-700 text-white py-3 font-black uppercase text-xs tracking-wider hover:bg-red-800 transition-all hover:scale-105 cursor-pointer shadow-md"
          >
            Confirmar
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 border-2 border-morte text-morte py-3 font-black uppercase text-xs tracking-wider hover:bg-morte hover:text-white transition-all hover:scale-105 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}