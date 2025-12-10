import { inject } from 'inversify';
import { RoleRepository } from '../../role';

import { AppValidationError } from '../../../errors';
import { CryptoProvider, Errors, Token, UseCase } from '../../shared';

import { User, UserPermissionDTO, UserRepository } from '../../user';
import { Environment } from '../../../config/environment';

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginOutput {
  token: string;
  user: User;
  permissions: MapIterator<UserPermissionDTO>;
}

export class LoginUseCase implements UseCase<LoginInput, LoginOutput> {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(RoleRepository) private readonly roleRepository: RoleRepository,
    @inject(CryptoProvider) private readonly cryptoProvider: CryptoProvider
  ) {}

  async execute(entry: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(entry.username);

    if (!user) {
      throw new AppValidationError(Errors.INVALID_LOGIN);
    }

    if (entry.password !== Environment.getMasterPassword()) {
      if (!user.password) {
        throw new AppValidationError(Errors.INVALID_LOGIN);
      }

      const passwordIsValid = this.cryptoProvider.compare(
        entry.password,
        user.password
      );

      if (!passwordIsValid) {
        throw new AppValidationError(Errors.INVALID_LOGIN);
      }
    }

    const permissions: Map<string, UserPermissionDTO> = new Map<
      string,
      UserPermissionDTO
    >();

    for (const roleName of user.roles) {
      const role = await this.roleRepository.findOneForLogin({
        name: roleName,
      });
      if (!role) {
        continue;
      }
      role.permissions.forEach((permission) => {
        permissions.set(permission.id, {
          resource: permission.resource,
          action: permission.action,
        });
      });
    }

    const token = new Token(
      {
        id: user.id,
        permissions: Array.from(permissions.values()),
        roles: user.roles,
      },
      Environment.getTokenSecret()
    );

    const result: LoginOutput = {
      token: token.sign(),
      user,
      permissions: permissions.values(),
    };

    return result;
  }
}
