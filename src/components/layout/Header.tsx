interface HeaderProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#0F213D] border-b border-[#1B3358] px-6 py-3">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-4 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="AportuCoche"
            className="w-14 h-14 object-contain"
          />

          <div className="leading-tight">
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

        {/* MENU */}
        <nav className="flex items-center gap-6 text-white font-semibold text-sm">
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
