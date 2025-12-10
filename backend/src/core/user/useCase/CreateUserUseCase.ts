import { inject, injectable, LazyServiceIdentifier } from 'inversify';
import { UserRepository } from '../provider/UserRepository';
import { User } from '../model/User';
import { CryptoProvider } from '../../shared/provider/CryptoProvider';

import { UseCase } from '../../shared';
import { CreateUserDTO } from '../dto';
import { UserEmailValidatorService } from '../service';
import { Role, ResolveRolesByNames } from '../../role';

@injectable()
export class CreateUserUseCase implements UseCase<CreateUserDTO, User> {
  constructor(
    @inject(new LazyServiceIdentifier(() => UserRepository))
    private readonly userRepository: UserRepository,
    @inject(new LazyServiceIdentifier(() => ResolveRolesByNames))
    private readonly resolveRolesByNames: ResolveRolesByNames,
    @inject(new LazyServiceIdentifier(() => CryptoProvider))
    private readonly cryptoProvider: CryptoProvider,
    @inject(new LazyServiceIdentifier(() => UserEmailValidatorService))
    private readonly userEmailValidator: UserEmailValidatorService
  ) {}

  async execute(dto: CreateUserDTO, session?: any): Promise<User> {
    await this.userEmailValidator.validate(dto.email);

    let roles: Role[] = await this.resolveRolesByNames.execute({
      names: dto.roles,
    });

    let password: string | null = null;

    if (dto.password) {
      password = this.cryptoProvider.hash(dto.password);
    }

    const newUser = new User({
      name: dto.name,
      email: dto.email,
      roles: roles.map((role) => role.name),
      phoneNumber: dto.phoneNumber,
      password,
    });

    const createdUser = await this.userRepository.create(newUser);

    return createdUser;
  }
}
