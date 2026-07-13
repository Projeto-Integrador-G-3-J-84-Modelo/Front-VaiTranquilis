import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="bg-morte text-white border-b-4 border-destaque shadow-2xl relative z-50">
     
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <span className="text-3xl transition-transform duration-500 group-hover:-rotate-12">⚰️</span>
          <span className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-destaque transition-colors">
            VaiTranquilis
          </span>
        </a>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center gap-8 font-bold">
        {/* alterei apenas o link de planos para ficar bonitinho */}
  <a href="/planos" className="inline-block hover:text-destaque transition-all hover:scale-105 uppercase text-sm tracking-widest cursor-pointer">
          Planos
         </a>
          <a href="/seguros" className="hover:text-destaque transition-colors uppercase text-sm tracking-widest">Seguros</a>
          <button className="bg-white text-morte px-6 py-2 rounded-sm font-black uppercase hover:bg-white transition-all transform hover:scale-105 shadow-md">
            Login
          </button>
        </div>

        {/* Botão Mobile */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-morte border-t border-destaque p-6 flex flex-col gap-4 text-center">
          <a href="/planos" className="block py-2 font-bold uppercase">Planos</a>
          <a href="/faq" className="block py-2 font-bold uppercase">Dúvidas</a>
          <button className="bg-destaque text-morte py-3 font-black uppercase">Login</button>
        </div>
      )}
    </nav>
  );
}