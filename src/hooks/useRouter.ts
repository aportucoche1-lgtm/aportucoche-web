import { useCallback, useEffect, useState } from 'react';

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string, query?: Record<string, string>) => {
    let url = path;
    if (query && Object.keys(query).length > 0) {
      const params = new URLSearchParams(query);
      url = `${path}?${params.toString()}`;
    }
    window.history.pushState({}, '', url);
    setCurrentPath(path);
    setSearchParams(new URLSearchParams(query ? new URLSearchParams(query).toString() : ''));
  }, []);

  return { currentPath, navigate, searchParams };
}
