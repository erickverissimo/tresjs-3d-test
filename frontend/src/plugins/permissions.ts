import { useAuthStore } from '../stores';
import { isAdmin } from './utils-plugins';

export function hasPermission(action: string, resource: string): boolean {
  if ((!action && !resource) || isAdmin()) {
    return true;
  }

  const store = useAuthStore();
  const currentUser = store.currentUser;

  if (!currentUser) {
    return false;
  }

  let hasPermission = false;

  if (action && resource) {
    hasPermission = currentUser.permissions.some(
      (permission: any) =>
        permission.action.toLowerCase() === action.trim().toLowerCase() &&
        permission.resource.toLowerCase() === resource.trim().toLowerCase(),
    );
  } else {
    hasPermission = true;
  }

  return hasPermission;
}

export function hasPermissions(actions: string[], resource: string): boolean {
  if ((!actions && !resource) || isAdmin()) {
    return true;
  }

  const store = useAuthStore();
  const currentUser = store.currentUser;

  if (!currentUser) {
    return false;
  }

  let hasPermission = false;

  if (actions.length > 0 && resource) {
    hasPermission = currentUser.permissions.some((permission: any) => {
      if (permission.resource.toLowerCase() === resource.toLowerCase()) {
        return actions
          .map((action) => action.toLowerCase())
          .includes(permission.action.toLowerCase());
      }
      return false;
    });
  } else {
    hasPermission = true;
  }

  return hasPermission;
}

export const permissionPlugin = {
  install(app: any) {
    app.config.globalProperties.$hasPermissions = hasPermissions;
    app.config.globalProperties.$hasPermission = hasPermission;
  },
};
