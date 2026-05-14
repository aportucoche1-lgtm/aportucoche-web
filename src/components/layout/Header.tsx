interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#0F213D] border-b border-[#1B3358]">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-[78px] md:h-[88px]">

        {/* LOGO */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 cursor-pointer"
        >

          <img
            src="/logo.png"
            alt="AportuCoche"
            className="
              w-14
              h-14
              md:w-20
              md:h-20
              object-contain
            "
          />

          <div className="leading-tight">

            <div className="text-[22px] md:text-[40px] font-black leading-none">

              <span className="text-white">
                aportu
              </span>

              <span className="text-green-400">
                coche
              </span>

              <span className="text-gray-300 text-[18px] md:text-[32px]">
                .com
              </span>

            </div>

            <div className="text-[10px] md:text-sm text-gray-400 mt-1">
              Comparador inteligente de coches
            </div>

          </div>

        </div>

        {/* MENU */}
        <nav className="flex items-center gap-4 md:gap-10 text-white font-semibold text-sm md:text-lg">

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
