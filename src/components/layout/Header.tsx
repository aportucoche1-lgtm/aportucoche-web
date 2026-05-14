import { Search } from 'lucide-react';

interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="relative bg-[#0F213D] border-b border-[#1B3358] overflow-hidden">

      {/* WATERMARK */}
      <img
        src="/radar.png"
        alt="background"
        className="
          absolute
          left-[18%]
          top-[-260px]
          w-[820px]
          opacity-[0.09]
          blur-[2px]
          pointer-events-none
          select-none
        "
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 relative z-10">

        {/* LOGO */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-4 cursor-pointer"
        >
          <img
            src="/radar.png"
            alt="AportuCoche"
            className="w-16 h-16 object-contain"
          />

          <div className="leading-tight">
            <div className="text-2xl font-black tracking-tight">
              <span className="text-white">
                aportu
              </span>

              <span className="text-green-400">
                coche
              </span>

              <span className="text-gray-400 text-sm ml-1">
                .com
              </span>
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

          <span className="opacity-60">
            Motos
          </span>

          <span className="opacity-60">
            Autocaravanas
          </span>
        </nav>

      </div>

    </header>
  );
}
