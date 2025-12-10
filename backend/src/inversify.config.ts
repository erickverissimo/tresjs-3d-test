import { Container } from 'inversify';
import { Server } from 'socket.io';

import { registerFileModule } from './inject/modules/file.module';
import { registerPermissionModule } from './inject/modules/permission.module';
import { registerUserModule } from './inject/modules/user.module';
import { registerSharedModule } from './inject/modules/shared.module';
import { registerAuthModule } from './inject/modules/auth.module';
import { registerRoleModule } from './inject/modules/role.module';

const container = new Container();

// Register all modules
function registerAllModules(container: Container) {
  registerSharedModule(container);
  registerUserModule(container);
  registerFileModule(container);
  registerPermissionModule(container);
  registerAuthModule(container);
  registerRoleModule(container);
}

// Registrar todos os módulos
registerAllModules(container);

export { container };
