import { isAdmin } from '@/plugins/utils-plugins';

export function checkAdminPermission() {
  return (to: any, from: any, next: any) => {
    if (isAdmin()) {
      next();
    } else {
      next('/404');
    }
  };
}
