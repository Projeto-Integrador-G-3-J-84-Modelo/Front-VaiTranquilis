import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 1. Importe os hooks necessários

export default function FormPlano() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Pega o ID caso seja uma edição

  // Descobre se a tela atual é de Edição ou de Cadastro baseado na URL
  const isEdicao = Boolean(id);

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue

    if (isEdicao) {
      console.log(`Disparando atualização para o plano ID: ${id}`);
      alert("Plano atualizado com sucesso!");
    } else {
      console.log("Disparando criação de um novo plano");
      alert("Plano cadastrado com sucesso!");
    }

    // 2. Manda o usuário de volta para a listagem para ver o resultado
    navigate('/planos');
  };

  return (
    <div className="bg-fundo min-h-screen text-texto flex items-center justify-center py-20 px-4">
      <div className="bg-white p-8 shadow-xl border-l-4 border-vida w-full max-w-md">
        
        {/* Título dinâmico: Muda sozinho se for cadastrar ou editar */}
        <h2 className="text-3xl font-black text-morte uppercase italic mb-6 border-b-2 border-morte/10 pb-2">
          {isEdicao ? `Editar Plano (${id})` : 'Cadastrar Plano'}
        </h2>
        
    {/* Formulário de cadastro/edição de plano*/}
        <form className="space-y-4" onSubmit={handleSalvar}>
          <div>
            <label className="block text-xs uppercase font-black text-morte mb-1">Nome do Plano</label>
            <input type="text" className="w-full border-2 border-morte/20 p-2 rounded-sm focus:border-vida outline-none" placeholder="Ex: Plano Morte Conforto" />
          </div>

          <div>
            <label className="block text-xs uppercase font-black text-morte mb-1">Descrição</label>
            <textarea className="w-full border-2 border-morte/20 p-2 rounded-sm focus:border-vida outline-none h-24 resize-none" placeholder="Detalhes sobre a cobertura..." />
          </div>

          <div>
            <label className="block text-xs uppercase font-black text-morte mb-1">Indenização Máxima (R$)</label>
            <input type="number" className="w-full border-2 border-morte/20 p-2 rounded-sm focus:border-vida outline-none" placeholder="Ex: 150000" />
          </div>

          {/* Adicionei o efeito hover:scale-105 aqui também para combinar com os outros botões! */}
          <button type="submit" className="w-full bg-vida text-white py-3 font-black uppercase text-sm hover:bg-morte transition-all hover:scale-105 cursor-pointer shadow-md mt-6">
            {isEdicao ? 'Salvar Alterações' : 'Salvar Plano'}
          </button>
        </form>
      </div>
    </div>
  );
}