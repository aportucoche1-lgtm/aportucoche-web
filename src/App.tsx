console.log("APP FUNCIONANDO OK");

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { useRouter } from './hooks/useRouter';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';

export default function App() {
  const { currentPath, navigate, searchParams } = useRouter();

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <Home
          onNavigate={navigate}
          onOpenAuth={() => {}}
          isLoggedIn={false}
        />
      );
    }

    if (currentPath.startsWith('/coches')) {
      return (
        <SearchResults
          onOpenAuth={() => {}}
          userId={null}
          isLoggedIn={false}
          initialSearchParams={searchParams}
        />
      );
    }

    return (
      <Home
        onNavigate={navigate}
        onOpenAuth={() => {}}
        isLoggedIn={false}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={navigate}
        currentPath={currentPath}
        onOpenAuth={() => {}}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
