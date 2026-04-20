interface FooterProps {
  onNavigate: (path: string) => void;
}

function FooterWordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/favicon-32x32.png"
        alt="Aportucoche"
        style={{ height: 28 }}
        className="object-contain flex-shrink-0"
      />
      <span className="font-black text-white text-base leading-none">
        aportu<span style={{ color: '#4CAF50' }}>coche</span>
        <span className="text-white/30 font-normal text-sm ml-0.5">.com</span>
      </span>
    </div>
  );
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="text-white/50" style={{ backgroundColor: '#111B26', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <button onClick={() => onNavigate('/')} className="mb-4 block">
              <FooterWordmark />
            </button>
            <p className="text-sm leading-relaxed text-white/40">
              El comparador inteligente de coches de segunda mano en España. Detectamos chollos por ti.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#4CAF50' }} />
              <span className="text-xs text-white/30">Sistema activo · Actualizado en tiempo real</span>
            </div>
          </div>

          <div>
            <h4 className="text-white/70 font-semibold mb-4 text-xs uppercase tracking-wider">Vehículos</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Coches de segunda mano', path: '/coches' },
                { label: 'Motos', path: '/motos' },
                { label: 'Autocaravanas', path: '/autocaravanas' },
              ].map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/70 font-semibold mb-4 text-xs uppercase tracking-wider">Plataformas</h4>
            <ul className="space-y-2 text-sm">
              {['Wallapop', 'Milanuncios', 'Coches.net', 'AutoScout24', 'Facebook Marketplace'].map((p) => (
                <li key={p}>
                  <span className="hover:text-white transition-colors cursor-default">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/70 font-semibold mb-4 text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm">
              {['Aviso legal', 'Política de privacidad', 'Cookies', 'Contacto'].map((item) => (
                <li key={item}>
                  <span className="hover:text-white transition-colors cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-sm text-white/25">
            © 2024 Aportucoche.com — Todos los derechos reservados
          </p>
          <p className="text-xs text-white/20 text-center">
            Los anuncios mostrados son propiedad de sus respectivas plataformas. Aportucoche.com actúa como agregador.
          </p>
        </div>
      </div>
    </footer>
  );
}
