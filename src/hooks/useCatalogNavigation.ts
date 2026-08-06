import { useCallback, useEffect, useMemo, useState } from 'react';

import { dispatchNavigationRequested } from '../events/dispatchers';

export type CatalogRoute =
  | { name: 'home' }
  | { name: 'restaurants' }
  | { name: 'restaurant'; restaurantId: string }
  | { name: 'search' }
  | { name: 'not-found' };

interface NavigationLocation {
  pathname: string;
  search: string;
}

function resolveRoute(pathname: string): CatalogRoute {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/') return { name: 'home' };
  if (path === '/restaurants') return { name: 'restaurants' };
  if (path === '/search') return { name: 'search' };

  const restaurantMatch = path.match(/^\/restaurants\/([^/]+)$/);
  if (restaurantMatch) {
    return { name: 'restaurant', restaurantId: decodeURIComponent(restaurantMatch[1]) };
  }

  return { name: 'not-found' };
}

function getBrowserLocation(): NavigationLocation {
  return { pathname: window.location.pathname, search: window.location.search };
}

export function useCatalogNavigation({ embedded = false } = {}) {
  const [location, setLocation] = useState<NavigationLocation>(getBrowserLocation);

  useEffect(() => {
    const handlePopState = () => setLocation(getBrowserLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = new URL(to, window.location.origin);
    const route = `${target.pathname}${target.search}`;

    dispatchNavigationRequested(route);
    setLocation({ pathname: target.pathname, search: target.search });

    if (!embedded && `${window.location.pathname}${window.location.search}` !== route) {
      window.history.pushState({}, '', route);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [embedded]);

  return {
    route: useMemo(() => resolveRoute(location.pathname), [location.pathname]),
    searchParams: useMemo(() => new URLSearchParams(location.search), [location.search]),
    navigate,
  };
}
