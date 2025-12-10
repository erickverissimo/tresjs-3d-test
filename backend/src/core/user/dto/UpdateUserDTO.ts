import { CreateUserDTO } from './CreateUserDTO';

export interface UpdateUserDTO extends CreateUserDTO {
  id: string;
}
