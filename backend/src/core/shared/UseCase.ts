// E = Entrada do método
// S = Saída do método

import { injectable } from 'inversify';

@injectable()
export abstract class UseCase<E, S> {
  abstract execute(entry: E): Promise<S>;
}
