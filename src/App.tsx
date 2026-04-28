console.log("APP FUNCIONANDO")
import { useState } from 'react';
import { AuthModal } from './components/auth/AuthModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { useAuth } from './hooks/useAuth';
import { useRouter } from './hooks/useRouter';
import { ComingSoon } from './pages/ComingSoon';
import { Home } from './pages/Home';
import { MiCuenta } from './pages/MiCuenta';
import { SearchResults } from './pages/SearchResults';

export default function App() {
  const { currentPath, navigate, searchParams } = useRouter();
  const { user, profile, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleOpenAuth = () => setAuthModalOpen(true);
  const handleCloseAuth = () => setAuthModalOpen(false);

  const renderPage = () => {
   if (currentPath === '/' || currentPath === '') {
  return (
    <Home
      onNavigate={navigate}
      onOpenAuth={handleOpenAuth}
      isLoggedIn={!!user}
    />
  );
}

    if (currentPath.startsWith('/coches')) {
      return (
        <SearchResults
          onOpenAuth={handleOpenAuth}
          userId={user?.id}
          isLoggedIn={!!user}
          initialSearchParams={searchParams}
        />
      );
    }

    if (currentPath.startsWith('/motos')) {
      return (
        <ComingSoon
          section="motos"
          onNavigate={navigate}
          onOpenAuth={handleOpenAuth}
        />
      );
    }

    if (currentPath.startsWith('/autocaravanas')) {
      return (
        <ComingSoon
          section="autocaravanas"
          onNavigate={navigate}
          onOpenAuth={handleOpenAuth}
        />
      );
    }

    if (currentPath.startsWith('/dashboard')) {
      if (!user || !profile) {
        return (
          <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Accede a tu panel</h2>
              <p className="text-gray-500 mb-6">Inicia sesión para ver tus favoritos y alertas</p>
              <button
                onClick={handleOpenAuth}
                className="px-6 py-3 text-white font-medium rounded-xl transition-colors" style={{ backgroundColor: '#1E2A38' }}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        );
      }
      return (
        <UserDashboard
          profile={profile}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath.startsWith('/cuenta')) {
      return (
        <MiCuenta onNavigate={navigate} />
      );
    }

    if (currentPath.startsWith('/admin')) {
      if (!profile?.is_admin) {
        return (
          <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Acceso restringido</h2>
              <p className="text-gray-500">Necesitas permisos de administrador</p>
            </div>
          </div>
        );
      }
      return <AdminPanel />;
    }

    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">404</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Página no encontrada</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 text-white font-medium rounded-xl transition-colors" style={{ backgroundColor: '#1E2A38' }}
          >
            Ir al inicio
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
    {/* 
      <Header
        onNavigate={navigate}
        currentPath={currentPath}
        onOpenAuth={handleOpenAuth}
      />
*/}

      <main className="flex-1">
        {loading ? (
          <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1E2A38', borderTopColor: 'transparent' }} />
          </div>
        ) : (
          renderPage()
        )}
      </main>

     {/* <Footer onNavigate={navigate} /> */}

      {authModalOpen && (
        <AuthModal onClose={handleCloseAuth} />
      )}
    </div>
  );
}
