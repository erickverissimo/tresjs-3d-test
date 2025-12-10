import { hashSync } from 'bcryptjs';

import {
  PermissionMongoose,
  UserMongoose,
  RoleMongoose,
} from '../externals/db/mongoose/models';

export async function up(): Promise<void> {
  const permissions = await PermissionMongoose.find();
  const permissionsForRole = permissions.map((permission) => ({
    id: permission.id,
    action: permission.action,
    resource: permission.resource,
    description: permission.description,
  }));

  //Remove o perfil caso exista
  await RoleMongoose.deleteOne({ name: 'admin' });

  //Adicionando permissões ao perfil admin
  const roleAdmin = new RoleMongoose({
    name: 'admin',
    description: 'Administrador Do Sistema',
    permissions: permissionsForRole,
    systemRole: true,
  });
  await roleAdmin.save();

  //Remove o usuario admin caso exista
  await UserMongoose.deleteOne({
    email: 'admin@oxy.com.br',
  });

  //Criando usuario admin
  const newUserAdmin = new UserMongoose({
    name: 'Administrador OXY',
    email: 'admin@oxy.com.br',
    phoneNumber: '999999999',
    password: 'BasePass@123',
    roles: ['admin'],
  });
  newUserAdmin.password = hashSync(newUserAdmin.password!);
  await newUserAdmin.save();
}

export async function down(): Promise<void> {
  await UserMongoose.deleteOne({
    email: 'admin@oxy.com.br',
  });
  await RoleMongoose.deleteOne({ name: 'admin' });
}
