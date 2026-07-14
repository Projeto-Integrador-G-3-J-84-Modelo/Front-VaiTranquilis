export interface PlanoProps {
  id: number;
  nome: string;
  descricao: string;
  indenizacaoMaxima: number;
  onEditar: (id: number) => void;
  onDeletar: (id: number) => void;
}

export default function CardPlano({ id, nome, descricao, indenizacaoMaxima, onEditar, onDeletar }: PlanoProps) {
  return (
    // Card do Plano
    <div className="bg-white p-8 border-l-4 border-vida shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between w-full min-h-[350px]">
      <div>
        {/* Título do Plano */}
        <h3 className="text-2xl font-black text-morte uppercase tracking-tight mb-3">
          {nome}
        </h3>

        {/* Descrição */}
        <p className="text-texto/80 text-sm mb-6 leading-relaxed">
          {descricao}
        </p>
      </div>

      <div>
        {/* Cobertura Máxima / Indenização */}
        <div className="border-t border-morte/10 pt-4 mb-6">
          <span className="text-xs uppercase font-bold text-texto/50 block tracking-wider mb-1">
            Cobertura Máx.
          </span>
          <span className="text-2xl font-black text-vida tracking-tight">
            {indenizacaoMaxima.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>

        {/* Botões de Ação com efeito de Zoom */}
        <div className="flex gap-3">
          <button
            onClick={() => onEditar(id)}
            className="flex-grow bg-vida text-white py-2.5 px-4 rounded-sm font-black uppercase text-xs hover:bg-morte transition-all hover:scale-105 cursor-pointer shadow-md"
          >
            Editar
          </button>

          <button
            onClick={() => onDeletar(id)}
            className="flex-grow border-2 border-morte text-morte py-2.5 px-4 rounded-sm font-black uppercase text-xs hover:bg-morte hover:text-white transition-all hover:scale-105 cursor-pointer"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}