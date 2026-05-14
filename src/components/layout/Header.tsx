interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
 onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#0F213D] border-b border-[#1B3358]">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 md:py-4">

        {/* LOGO */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="AportuCoche"
            className="
              w-20
              h-20
              md:w-32
              md:h-32
              object-contain
            "
          />

          <div className="leading-tight">
            <div className="text-xl md:text-4xl font-black">
              <span className="text-white">aportu</span>
              <span className="text-green-400">coche</span>
              <span className="text-gray-300">.com</span>
            </div>

            <div className="text-xs md:text-base text-gray-400">
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
