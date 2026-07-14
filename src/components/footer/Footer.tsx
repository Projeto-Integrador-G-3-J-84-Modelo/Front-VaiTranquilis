export function Footer() {
  return (
    <footer className="bg-morte text-white py-10 border-t-8 border-destaque w-full">
      {/* O container interno limita a largura do conteúdo e centraliza */}
      <div className="max-w-7xl mx-auto px-40">

        {/* Bloco do Logo */}
        <div className="text-center mb-4 border-b border-white/10 pb-3">
          <div className="flex justify-center mb-1">
            <img src="/skeletin01.png" alt="Logo" className="w-12 h-12" />
          </div>
          <p className="font-black text-3xl uppercase italic tracking-tighter">VaiTranquilis</p>
          <p className="text-sm opacity-60 mt-2 italic">"Onde a tranquilidade encontra o seu destino final."</p>
        </div>

        {/* Grid de Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {[
            {
              title: "Navegação",
              links: [
                { label: "Home", path: "/" },
                { label: "Planos", path: "/planos" },
                { label: "Seguros", path: "/seguros" }
              ]
            },
            {
              title: "Legal",
              links: [
                { label: "Termos de Partida", path: "/" },
                { label: "Privacidade", path: "/" },
                { label: "Ética", path: "/" }
              ]
            },
            {
              title: "Emergência",
              links: [
                { label: "Ligar agora", path: "/" },
                { label: "Suporte 24h", path: "/" }
              ]
            },
            {
              title: "Social",
              links: [
                { label: "Instagram", path: "/" },
                { label: "Twitter", path: "/" },
                { label: "LinkedIn", path: "/" }
              ]
            }
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-black uppercase text-destaque mb-1 tracking-widest text-sm">{section.title}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.path} className="hover:text-destaque transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rodapé final */}
        <div className="text-center mt-5 pt-4 border-t border-white/10">
          <p className="text-[10px] text-white/30 uppercase tracking-widest">
            © 2026 VaiTranquilis Corp. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}