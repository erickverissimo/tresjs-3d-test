import { Entity, EntityProps } from '../../shared/model/Entity';

export interface PermissionProps extends EntityProps {
  resource: string;
  action: string;
  description: string;
}

export class Permission extends Entity<PermissionProps> {
  resource: string;
  action: string;
  description: string;

  constructor(props: PermissionProps) {
    super(props);
    this.resource = props.resource;
    this.action = props.action;
    this.description = props.description;
  }

  update(props: Partial<PermissionProps>) {
    this.updateAllFieldsIfPresent(props);
  }
}
