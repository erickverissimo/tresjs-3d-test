import { Container } from 'inversify';
import { LoginController, GetMeController } from '../../controllers';
import { LoginUseCase } from '../../core/auth/useCase';
import { CryptoProvider } from '../../core/shared';
import { CryptoProviderImplementation } from '../../provider/crypto/CryptoProviderImplementation';

export function registerAuthModule(container: Container): void {
  // Controllers
  container.bind(LoginController).toSelf();
  container.bind(GetMeController).toSelf();

  // Use Cases
  container.bind(LoginUseCase).toSelf();

  // Providers
  container.bind(CryptoProvider).to(CryptoProviderImplementation);
}
