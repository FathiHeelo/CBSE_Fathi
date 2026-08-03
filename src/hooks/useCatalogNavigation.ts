import { useCallback, useEffect, useMemo, useState } from 'react';

export type CatalogRoute =
  | { name: 'home' }
  | { name: 'products' }
  | { name: 'product'; slug: string }
  | { name: 'not-found' };

function resolveRoute(pathname: string): CatalogRoute {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/') return { name: 'home' };
  if (path === '/products') return { name: 'products' };

  const productMatch = path.match(/^\/products\/([^/]+)$/);
  if (productMatch) return { name: 'product', slug: decodeURIComponent(productMatch[1]) };

  return { name: 'not-found' };
}

export function useCatalogNavigation() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
      setPathname(to);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route: useMemo(() => resolveRoute(pathname), [pathname]), navigate };
}

