import { Search } from 'lucide-react';

interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#13233A] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

        {/* LOGO */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => onNavigate('/')}
        >
          <img
            src="/logo.png"
            alt="AportuCoche"
            className="w-20 h-20 object-contain"
          />

          <div>
            <div className="text-3xl font-black leading-none">
              <span className="text-white">aportu</span>
              <span className="text-green-400">coche</span>
              <span className="text-gray-300 text-xl">.com</span>
            </div>

            <div className="text-xs text-gray-400 mt-1">
              Comparador inteligente de coches
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-white rounded-2xl px-4 py-3 w-[450px] shadow-inner">
          <Search className="text-gray-400 w-5 h-5 mr-3" />

          <input
            placeholder="Busca marca, modelo..."
            className="w-full text-black outline-none text-sm"
          />
        </div>

        {/* NAV */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          <span
            className="cursor-pointer hover:text-green-400 transition"
            onClick={() => onNavigate('/coches')}
          >
            Coches
          </span>

          <span className="opacity-60">Motos</span>
          <span className="opacity-60">Autocaravanas</span>
        </div>

      </div>
    </header>
  );
}
