import { IPermission, PermissionMongoose } from '../externals/db/mongoose';

const permissions: Partial<IPermission>[] = [
  // permissões usuários
  {
    resource: 'user',
    action: 'create',
    description: 'Permite criar novos usuários.',
  },
  {
    resource: 'user',
    action: 'update',
    description: 'Permite atualizar dados de usuários.',
  },
  {
    resource: 'user',
    action: 'delete',
    description: 'Permite remover usuários.',
  },
  {
    resource: 'user',
    action: 'access',
    description: 'Permite acessar a listagem de usuários.',
  },
  {
    resource: 'user',
    action: 'view',
    description: 'Permite visualizar dados de usuários.',
  },
  // permissões perfis
  {
    resource: 'role',
    action: 'create',
    description: 'Permite criar novos perfis de permissão de acesso.',
  },
  {
    resource: 'role',
    action: 'update',
    description: 'Permite atualizar seus perfis de permissão de acesso.',
  },
  {
    resource: 'role',
    action: 'delete',
    description: 'Permite remover seus perfis de permissão de acesso.',
  },
  {
    resource: 'role',
    action: 'access',
    description: 'Permite listar  seus perfis de permissão de acesso.',
  },
  {
    resource: 'role',
    action: 'view',
    description: 'Permite visualizar seus perfis de permissão de acesso.',
  },
];

export async function up(): Promise<void> {
  for (const role of permissions) {
    await PermissionMongoose.create({
      resource: role.resource,
      action: role.action,
      description: role.description,
    });
  }
}

export async function down(): Promise<void> {
  for (const role of permissions) {
    await PermissionMongoose.deleteOne({
      resource: role.resource,
      action: role.action,
    });
  }
}
