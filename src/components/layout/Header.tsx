interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#0F213D] border-b border-[#1B3358] relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="flex items-center justify-between py-2 md:py-3">

          {/* LOGO */}
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 cursor-pointer relative z-10"
          >

            <img
              src="/logo.png"
              alt="AportuCoche"
              className="
                w-16
                h-16
                md:w-24
                md:h-24
                object-contain
                drop-shadow-lg
              "
            />

            <div className="leading-tight">

              <div className="font-black leading-none">

                <span className="text-white text-xl md:text-3xl">
                  aportu
                </span>

                <span className="text-green-400 text-xl md:text-3xl">
                  coche
                </span>

                <span className="text-gray-300 text-base md:text-xl ml-1">
                  .com
                </span>

              </div>

              <div className="text-gray-400 text-[10px] md:text-sm mt-1">
                Comparador inteligente de coches
              </div>

            </div>

          </div>

          {/* MENU */}
          <nav className="flex items-center gap-4 md:gap-8 text-white font-semibold relative z-10">

            <button
              onClick={() => onNavigate('/coches')}
              className="hover:text-green-400 transition"
            >
              Coches
            </button>

            <span className="opacity-60 hidden md:block">
              Motos
            </span>

            <span className="opacity-60 hidden md:block">
              Autocaravanas
            </span>

          </nav>

        </div>

      </div>

    </header>
  );
}
