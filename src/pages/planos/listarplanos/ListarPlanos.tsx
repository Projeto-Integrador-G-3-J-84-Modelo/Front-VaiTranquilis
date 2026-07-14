import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CardPlano from '../cardplano/CardPlano';
import { buscarPuro } from '../../../services/Service';
import type PlanoSeguro from '../../../models/PlanoSeguro';

export default function ListarPlanos() {
  const [planos, setPlanos] = useState<PlanoSeguro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const buscarPlanos = async () => {
    try {
      setCarregando(true);
      setErro(""); // Limpa erros anteriores

      // Busca os dados diretamente da API
      const dados = await buscarPuro('/planos');

      // Garante que o estado receba um array válido
      setPlanos(Array.isArray(dados) ? dados : []);
    } catch (error) {
      setErro("Nenhum plano cadastrado.");
      setPlanos([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarPlanos();
  }, []);

  const handleEditar = (id: number) => {
    navigate(`/editar-plano/${id}`);
  };

  const handleDeletar = (id: number) => {
    navigate(`/deletar-plano/${id}`);
  };

  return (
    <div className="bg-fundo min-h-screen text-texto">
      <main className="max-w-5xl mx-auto px-6 py-20">

        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl font-black text-morte uppercase italic tracking-tighter">
            Nossos Planos de Proteção
          </h2>

          <p className="text-xl text-texto/80 max-w-2xl mx-auto border-b-2 border-morte pb-6 pt-4">
            Organize a sua saída. O mundo não para, mas a sua tranquilidade (e a deles) você deixa garantida.
          </p>

          {/* Botão de Cadastro Adicionado */}
          <Link
            className="mx-auto block max-w-sm w-full mt-8 px-10 py-4 bg-vida text-white text-sm font-black uppercase rounded-sm hover:bg-morte transition-all hover:scale-[1.02] shadow-lg border-b-4 border-yellow-900 block text-center"
            to="/cadastrar-plano"
          >
            Cadastrar Plano
          </Link>
        </div>
      
        {carregando ? (
          <div className="text-center py-10">
            <p className="text-xl font-bold animate-pulse text-morte">Carregando planos de seguro...</p>
          </div>
        ) : erro ? (
          <p className="bg-red-100 text-red-700 p-4 rounded-sm font-bold text-sm text-center mb-8">
            {erro}
          </p>
        ) : !planos || planos.length === 0 ? (
          <p className="text-center text-texto/60 italic">Nenhum plano cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planos.map((plano) => (
              <CardPlano
                key={plano.id}
                id={plano.id}
                nome={plano.nomePlano}
                descricao={plano.descricao}
                indenizacaoMaxima={plano.indenizacaoMaxima}
                onEditar={handleEditar}
                onDeletar={handleDeletar}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}