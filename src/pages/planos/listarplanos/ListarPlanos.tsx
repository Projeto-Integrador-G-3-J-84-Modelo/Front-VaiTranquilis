import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardPlano from '../cardplano/CardPlano';

interface Plano {
  id: number;
  nome: string;
  descricao: string;
  indenizacaoMaxima: number;
}

export default function ListarPlanos() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [carregando, setCarregando] = useState(true);
  
  const navigate = useNavigate(); // 2. Inicialize o navigate

  const buscarPlanos = async () => {
    try {
      setCarregando(true);
      setPlanos([
        { id: 1, nome: "Plano Livre de Boletos", descricao: "Você parte, mas suas dívidas não te acompanham. Quitamos o que você deve para que sua única preocupação seja o descanso.", indenizacaoMaxima: 50000.00 },
        { id: 2, nome: "Plano Herança sem Choro", descricao: "O seguro ideal para quem quer ser lembrado pelas boas lembranças e pelo saldo bancário generoso que deixou para os vivos.", indenizacaoMaxima:  250000.00 },
        { id: 3, nome: "Plano Adeus, Mundo Cruel", descricao: "Proteção máxima para quem prefere sair de cena com estilo e garantir que a família não precise vender o carro na semana seguinte.", indenizacaoMaxima: 1000000.00 }
      ]);
    } catch (erro) {
      console.error("Erro ao buscar planos:", erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarPlanos();
  }, []);

  // funções para lidar com edição e exclusão
  const handleEditar = (id: number) => {
    navigate(`/editar-plano/${id}`);
  };

  // função para lidar com exclusão
  const handleDeletar = (id: number) => {
    navigate(`/deletar-plano/${id}`);
  };

  // renderização do componente
  return (
    <div className="bg-fundo min-h-screen text-texto">
      <main className="max-w-5xl mx-auto px-6 py-20">
        
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl font-black text-morte uppercase italic tracking-tighter">
            Nossos Planos de Proteção
          </h2>
          <p className="text-xl text-texto/80 max-w-2xl mx-auto border-b-2 border-morte pb-6">
            Selecione a cobertura ideal para organizar o futuro com total segurança e praticidade.
          </p>
        </div>

        {carregando ? (
          <div className="text-center py-10">
            <p className="text-xl font-bold animate-pulse text-morte">Carregando planos de seguro...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planos.map((plano) => (
              <CardPlano
                key={plano.id}
                id={plano.id}
                nome={plano.nome}
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