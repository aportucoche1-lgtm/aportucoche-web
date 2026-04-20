import { Bell, ChevronDown, Heart, LogOut, Menu, Search, Shield, User, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  onOpenAuth: () => void;
}

function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const width = size === 'sm' ? 120 : 160;
  return (
    <img
      src="/favicon-32x32.png"
      alt="Aportucoche"
      style={{ height: size === 'sm' ? 28 : 34 }}
      className="object-contain"
    />
  );
}

function WordmarkLogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/favicon-32x32.png"
        alt="Aportucoche logo"
        style={{ height: size === 'sm' ? 26 : 32 }}
        className="object-contain flex-shrink-0"
      />
      <div className="leading-none">
        <span className="font-black text-white tracking-tight" style={{ fontSize: size === 'sm' ? 15 : 18 }}>
          aportu
        </span>
        <span className="font-black tracking-tight" style={{ color: '#4CAF50', fontSize: size === 'sm' ? 15 : 18 }}>
          coche
        </span>
        <span className="text-white/40 font-normal ml-0.5" style={{ fontSize: size === 'sm' ? 11 : 13 }}>
          .com
        </span>
      </div>
    </div>
  );
}

export function Header({ onNavigate, currentPath, onOpenAuth }: HeaderProps) {
  const { user, profile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Coches', path: '/coches' },
    { label: 'Motos', path: '/motos' },
    { label: 'Autocaravanas', path: '/autocaravanas' },
  ];

  const isActive = (path: string) => currentPath.startsWith(path);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('/coches');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#1E2A38', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-4">
          <button onClick={() => onNavigate('/')} className="flex-shrink-0">
            <WordmarkLogo />
          </button>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca marca, modelo... ej: BMW X3, Seat León..."
                className="w-full pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 rounded-xl border focus:outline-none focus:border-white/20 transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}
              />
            </div>
          </form>

          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive(item.path) ? 'rgba(76,175,80,0.15)' : 'transparent',
                  color: isActive(item.path) ? '#4CAF50' : 'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4CAF50' }}>
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white max-w-[110px] truncate">
                    {profile?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Mi cuenta</p>
                      </div>
                      <button
                        onClick={() => { onNavigate('/cuenta'); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        Mi perfil
                      </button>
                      <button
                        onClick={() => { onNavigate('/dashboard'); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-gray-400" />
                        Mi panel
                      </button>
                      <button
                        onClick={() => { onNavigate('/dashboard?tab=alerts'); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Bell className="w-4 h-4 text-gray-400" />
                        Alertas
                      </button>
                      {profile?.is_admin && (
                        <button
                          onClick={() => { onNavigate('/admin'); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Shield className="w-4 h-4 text-gray-400" />
                          Administración
                        </button>
                      )}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={() => { signOut(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
                  style={{ backgroundColor: '#4CAF50' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#3d9140'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#4CAF50'; }}
                >
                  Registrarse
                </button>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: '#1E2A38', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="px-4 py-3 space-y-1">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busca marca, modelo..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 rounded-xl border focus:outline-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}
                />
              </div>
            </form>

            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => { onNavigate(item.path); setMobileOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive(item.path) ? 'rgba(76,175,80,0.15)' : 'transparent',
                  color: isActive(item.path) ? '#4CAF50' : 'rgba(255,255,255,0.7)',
                }}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t mt-1" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              {user ? (
                <>
                  <button
                    onClick={() => { onNavigate('/cuenta'); setMobileOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white"
                  >
                    Mi perfil
                  </button>
                  <button
                    onClick={() => { onNavigate('/dashboard'); setMobileOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white"
                  >
                    Mi panel
                  </button>
                  <button
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { onOpenAuth(); setMobileOpen(false); }}
                  className="w-full py-3 text-white text-sm font-semibold rounded-xl text-center"
                  style={{ backgroundColor: '#4CAF50' }}
                >
                  Iniciar sesión / Registrarse
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
