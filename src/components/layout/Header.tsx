import { Search } from 'lucide-react';

interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#0F213D] border-b border-[#1B3358] px-8 py-3">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="AportuCoche"
            className="w-20 h-20 object-contain"
          />

          <div className="leading-tight">
            <div className="text-2xl font-black leading-none">
              <span className="text-white">aportu</span>
              <span className="text-green-400">coche</span>
              <span className="text-gray-300 text-lg">.com</span>
            </div>

            <div className="text-xs text-gray-400 mt-1">
              Comparador inteligente de coches
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-white rounded-2xl px-5 py-3 w-[420px]">
          <Search className="text-gray-400 w-5 h-5 mr-3" />

          <input
            type="text"
            placeholder="Busca marca, modelo..."
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* MENU */}
        <nav className="flex items-center gap-8 text-white font-semibold">
          <button onClick={() => onNavigate('/coches')}>
            Coches
          </button>

          <span className="opacity-60">Motos</span>

          <span className="opacity-60">Autocaravanas</span>
        </nav>

      </div>

    </header>
  );
}
