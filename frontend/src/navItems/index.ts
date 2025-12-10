import { hasPermission } from '@/plugins/permissions';

import { adminRoutes } from '@/router/AdminRoutes';

const routes = [...adminRoutes];

export function getInitialRoute(): string {
  for (const route of routes) {
    if (
      hasPermission((route.meta as any).action, (route.meta as any).resource)
    ) {
      return (route.path as any).toString().toLowerCase();
    }
  }

  return '/notFound';
}
