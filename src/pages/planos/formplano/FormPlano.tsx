import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cadastrar, atualizar, buscar } from '../../../services/Service';
import type PlanoSeguro from '../../../models/PlanoSeguro';

export default function FormPlano() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdicao = Boolean(id);

  const [plano, setPlano] = useState<Omit<PlanoSeguro, 'id'>>({
    nomePlano: '',
    descricao: '',
    indenizacaoMaxima: 0
  });

  useEffect(() => {
    if (isEdicao) {
      buscar<PlanoSeguro>(`/planos/${id}`, setPlano);
    }
  }, [id, isEdicao]);

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdicao) {
      // O PUT precisa do ID na URL para o JSON Server identificar o registro
      await atualizar<PlanoSeguro, PlanoSeguro>(`/planos/${id}`, { ...plano, id: Number(id) }, () => {
        alert("Plano atualizado com sucesso!");
        navigate('/planos');
      });
    } else {
      await cadastrar<Omit<PlanoSeguro, 'id'>, PlanoSeguro>('/planos', plano, () => {
        alert("Plano cadastrado com sucesso!");
        navigate('/planos');
      });
    }
  };

  return (
    <div className="bg-fundo min-h-screen text-texto flex items-center justify-center py-20 px-4">
      <div className="bg-white p-8 shadow-xl border-l-4 border-vida w-full max-w-md">
        <h2 className="text-3xl font-black text-morte uppercase italic mb-6 border-b-2 border-morte/10 pb-2">
          {isEdicao ? `Editar Plano (${id})` : 'Cadastrar Plano'}
        </h2>

        <form className="space-y-4" onSubmit={handleSalvar}>
          <div>
            <label className="block text-xs uppercase font-black text-morte mb-1">Nome do Plano</label>
            <input
              value={plano.nomePlano}
              onChange={(e) => setPlano({ ...plano, nomePlano: e.target.value })}
              type="text" className="w-full border-2 border-morte/20 p-2 rounded-sm focus:border-vida outline-none" required
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-black text-morte mb-1">Descrição</label>
            <textarea
              value={plano.descricao}
              onChange={(e) => setPlano({ ...plano, descricao: e.target.value })}
              className="w-full border-2 border-morte/20 p-2 rounded-sm focus:border-vida outline-none h-24 resize-none" required
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-black text-morte mb-1">Indenização Máxima (R$)</label>
            <input
              value={plano.indenizacaoMaxima}
              onChange={(e) => setPlano({ ...plano, indenizacaoMaxima: Number(e.target.value) })}
              type="number" className="w-full border-2 border-morte/20 p-2 rounded-sm focus:border-vida outline-none" required
            />
          </div>

          <button type="submit" className="w-full bg-vida text-white py-3 font-black uppercase text-sm hover:bg-morte transition-all hover:scale-105 cursor-pointer shadow-md mt-6">
            {isEdicao ? 'Salvar Alterações' : 'Salvar Plano'}
          </button>
        </form>
      </div>
    </div>
  );
}