export default function Home() {
  return (
    <div className="bg-fundo min-h-screen text-texto">
      <main className="max-w-5xl mx-auto px-6 py-20">
        
        {/* Seção Hero */}
        <section className="text-center space-y-8 py-16 relative">
          {/* Badge de Autoridade */}
          <div className="inline-block bg-morte/10 text-morte px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 italic border border-morte/20">
            Líder em tranquilidade desde 2026
          </div>
          
          <h1 className="text-7xl font-black text-morte uppercase italic leading-none tracking-tighter">
            A vida é curta. <br/> A paz é eterna.
          </h1>
          
          <p className="text-xl text-texto/80 max-w-2xl mx-auto border-b-2 border-morte pb-8">
            Você não vai levar nada, mas pode deixar tudo organizado. 
            Contrate o seguro que garante que sua partida seja tão tranquila quanto uma soneca.
          </p>
          
           <a href="/cadastrar-usuario" className="bg-vida text-white px-12 py-5 text-lg font-black uppercase rounded-sm hover:bg-morte transition-all hover:scale-105 shadow-lg border-b-4 border-green-800">
             Garantir minha tranquilidade
            </a>
        </section>

        {/* O Fluxo de Partida */}
        <section className="py-20 border-t-2 border-morte/20">
          <h2 className="text-3xl font-black text-center mb-16 text-morte uppercase tracking-tighter">Sua partida em 3 passos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Escolha seu plano", desc: "Do básico ao 'festa no céu'." },
              { num: "02", title: "Documentação", desc: "Preencha a papelada enquanto ainda pode." },
              { num: "03", title: "Descanse", desc: "A parte difícil é nossa. A paz é sua." }
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="text-6xl font-black text-morte/10 mb-4">{step.num}</div>
                <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">{step.title}</h3>
                <p className="text-sm opacity-70">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback */}
        <section className="py-20 border-t-2 border-morte/20">
          <h2 className="text-3xl font-black text-center mb-12 text-morte uppercase tracking-tighter">O que nossos clientes (ainda) dizem</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { nome: "Sr. Alfredo", msg: "Nunca me senti tão leve. Literalmente." },
              { nome: "Dona Neide", msg: "A burocracia é o único pesadelo, aqui não tem." },
              { nome: "Cláudio S.", msg: "Já deixei tudo pago. Agora é só esperar." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 border-l-4 border-destaque shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-default">
                <p className="text-lg italic text-texto mb-6">"{f.msg}"</p>
                <p className="font-black text-morte text-sm uppercase">— {f.nome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer Irônico */}
        <section className="max-w-2xl mx-auto bg-morte/5 p-8 rounded-sm border border-morte/20 text-center mb-20">
          <p className="text-xs text-morte uppercase font-bold tracking-widest italic">
            * Aviso: A paz eterna está sujeita à pontualidade do destino. O VaiTranquilis não se responsabiliza por milagres.
          </p>
        </section>

      </main>
    </div>
  );
}