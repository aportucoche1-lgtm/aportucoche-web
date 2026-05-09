import { Search } from 'lucide-react';

interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#13233A] text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => onNavigate('/')}
        >
          aportucoche.com
        </div>

        {/* SEARCH (simple) */}
        <div className="hidden md:flex items-center bg-white rounded-xl px-3 py-2 w-96">
          <Search className="text-gray-400 w-4 h-4 mr-2" />
          <input
            placeholder="Busca marca, modelo..."
            className="w-full text-black outline-none text-sm"
          />
        </div>

        {/* NAV */}
        <div className="flex items-center gap-6 text-sm">
          <span className="cursor-pointer" onClick={() => onNavigate('/coches')}>
            Coches
          </span>
          <span className="opacity-50">Motos</span>
          <span className="opacity-50">Autocaravanas</span>
        </div>

      </div>
    </header>
  );
}
