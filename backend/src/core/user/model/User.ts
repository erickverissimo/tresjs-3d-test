import { Entity, EntityProps } from '../../shared/model/Entity';

export interface UserProps extends EntityProps {
  name: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  password?: string | null;
}

export class User extends Entity<UserProps> {
  name: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  password: string | null;

  constructor(props: UserProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.roles = props.roles ?? [];
    this.phoneNumber = props.phoneNumber;
    this.password = props.password ?? null;
  }

  update(props: Partial<UserProps>) {
    this.updateAllFieldsIfPresent(props);
  }
}
