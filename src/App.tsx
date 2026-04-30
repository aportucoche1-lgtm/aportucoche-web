console.log("APP FUNCIONANDO OK");

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

    return <Home onNavigate={navigate} onOpenAuth={handleOpenAuth} isLoggedIn={!!user} />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={navigate}
        currentPath={currentPath}
        onOpenAuth={handleOpenAuth}
      />

      <main className="flex-1">
        {loading ? renderPage() : renderPage()}
      </main>

      <Footer onNavigate={navigate} />

      {authModalOpen && (
        <AuthModal onClose={handleCloseAuth} />
      )}
    </div>
  );
}
  );
}
