interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#0F213D] border-b border-[#1B3358] relative overflow-hidden">

      {/* LOGO WATERMARK */}
      <img
        src="/logo.png"
        alt="watermark"
        className="
          absolute
          left-[-120px]
          top-[80px]
          w-[500px]
          opacity-[0.05]
          pointer-events-none
          select-none
          hidden md:block
        "
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* TOP BAR */}
        <div className="flex items-center justify-between py-4 md:py-5">

          {/* LOGO */}
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 cursor-pointer relative z-10"
          >
            <img
              src="/logo.png"
              alt="AportuCoche"
              className="
                w-12
                h-12
                md:w-16
                md:h-16
                object-contain
                drop-shadow-lg
              "
            />

            <div className="leading-tight">
              <div className="font-black leading-none">
                <span className="text-white text-2xl md:text-4xl">
                  aportu
                </span>

                <span className="text-green-400 text-2xl md:text-4xl">
                  coche
                </span>

                <span className="text-gray-300 text-lg md:text-2xl ml-1">
                  .com
                </span>
              </div>

              <div className="text-gray-400 text-xs md:text-sm mt-1">
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
