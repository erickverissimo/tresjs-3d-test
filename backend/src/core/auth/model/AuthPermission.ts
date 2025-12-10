export namespace AuthPermissions {
  export interface Permission {
    resource: string;
    action: string;
  }

  type ResourceActions = Record<string, Permission>;

  interface AuthPermission {
    [resource: string]: ResourceActions;
  }

  export const permissions: AuthPermission = {
    user: {
      create: { resource: 'user', action: 'create' },
      update: { resource: 'user', action: 'update' },
      delete: { resource: 'user', action: 'delete' },
      access: { resource: 'user', action: 'access' },
      view: { resource: 'user', action: 'view' },
    },
    role: {
      create: { resource: 'role', action: 'create' },
      update: { resource: 'role', action: 'update' },
      delete: { resource: 'role', action: 'delete' },
      access: { resource: 'role', action: 'access' },
      view: { resource: 'role', action: 'view' },
    },
  };
}
