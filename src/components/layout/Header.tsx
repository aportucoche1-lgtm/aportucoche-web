import { Search } from 'lucide-react';

interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="relative bg-[#0F213D] border-b border-[#1B3358] overflow-hidden">

      {/* WATERMARK LOGO */}
      <img
        src="/logo.png"
        alt="background logo"
        className="
          absolute
          left-[22%]
          top-[-140px]
          w-[420px]
          opacity-[0.05]
          blur-[1px]
          pointer-events-none
          select-none
        "
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5 relative z-10">

        {/* LOGO */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="AportuCoche"
            className="w-16 h-16 object-contain"
          />

          <div className="leading-tight">
            <div className="text-xl font-black">
              <span className="text-white">aportu</span>
              <span className="text-green-400">coche</span>
              <span className="text-gray-400 text-sm ml-1">.com</span>
            </div>

            <div className="text-xs text-gray-400">
              Comparador inteligente de coches
            </div>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex items-center gap-10 text-white font-semibold">
          <button
            onClick={() => onNavigate('/coches')}
            className="hover:text-green-400 transition"
          >
            Coches
          </button>

          <span className="opacity-60">Motos</span>

          <span className="opacity-60">Autocaravanas</span>
        </nav>

      </div>

    </header>
  );
}
