interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#0F213D] border-b border-[#1B3358]">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-1 md:py-2">

        {/* LOGO */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 cursor-pointer"
        >

          <img
            src="/logo.png"
            alt="AportuCoche"
            className="
              w-24
              h-24
              md:w-44
              md:h-44
              object-contain
            "
          />

          <div className="leading-tight">

            <div className="text-lg md:text-3xl font-black">

              <span className="text-white">
                aportu
              </span>

              <span className="text-green-400">
                coche
              </span>

              <span className="text-gray-300">
                .com
              </span>

            </div>

            <div className="text-[11px] md:text-sm text-gray-400">
              Comparador inteligente de coches
            </div>

          </div>

        </div>

        {/* MENU */}
        <nav className="flex items-center gap-4 md:gap-8 text-white font-semibold text-sm md:text-lg">

          <button onClick={() => onNavigate('/coches')}>
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
