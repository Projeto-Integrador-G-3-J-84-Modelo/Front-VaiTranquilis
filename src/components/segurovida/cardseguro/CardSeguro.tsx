import { Link } from "react-router-dom";
import type SeguroVida from "../../../models/SeguroVida";

interface CardSeguroProps {
  seguro: SeguroVida;
}

function CardSeguro({ seguro }: CardSeguroProps) {
  const mensalidadeFormatada = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(seguro.valorMensalidade);

  const coberturaFormatada = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(seguro.planoSeguro.indenizacaoMaxima);

  return (
    <article className="bg-white p-8 border-l-4 border-vida shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between w-full min-h-[380px]">
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-morte/60">
          Seguro contratado
        </span>

        <h3 className="text-2xl font-black text-morte uppercase tracking-tight mt-2 mb-3">
          {seguro.usuario.nome}
        </h3>

        <p className="text-texto/80 text-sm leading-relaxed">
          Plano escolhido:{" "}
          <strong className="text-morte">{seguro.planoSeguro.nomePlano}</strong>
        </p>
      </div>

      <div>
        <div className="border-t border-morte/10 pt-4 mt-6 space-y-3">
          <div>
            <span className="text-xs uppercase font-bold text-texto/50 block tracking-wider mb-1">
              Mensalidade
            </span>
            <span className="text-2xl font-black text-vida tracking-tight">
              {mensalidadeFormatada}
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-bold text-texto/50 block tracking-wider mb-1">
              Cobertura máxima
            </span>
            <span className="text-sm font-black text-morte tracking-tight">
              {coberturaFormatada}
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-bold text-texto/50 block tracking-wider mb-1">
              Data de contratação
            </span>
            <span className="text-sm text-texto/80">
              {seguro.dataContratacao}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Link
            className="flex-1 text-center bg-vida text-white py-2.5 px-4 rounded-sm font-black uppercase text-xs hover:bg-morte transition-all hover:scale-105 shadow-md no-underline"
            to={`/editarSeguro/${seguro.id}`}>

            Editar
          </Link>

          <Link
            className="flex-1 text-center border-2 border-morte text-morte py-2.5 px-4 rounded-sm font-black uppercase text-xs hover:bg-morte hover:text-white transition-all hover:scale-105 no-underline"
            to={`/deletarSeguro/${seguro.id}`}>
                
            Excluir
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CardSeguro;