import { Entity, EntityProps } from '../../shared/model/Entity';
import { RolePermission } from './RolePermission';

export interface RoleProps extends EntityProps {
  name: string;
  description: string;
  companyId?: string | null;
  vendorId?: string | null;
  permissions?: RolePermission[];
}

export class Role extends Entity<RoleProps> {
  name: string;
  description: string;
  companyId: string | null;
  vendorId: string | null;
  permissions: RolePermission[] = [];

  constructor(props: RoleProps) {
    super(props);
    this.name = props.name;
    this.description = props.description;
    this.companyId = props.companyId ?? null;
    this.vendorId = props.vendorId ?? null;
    this.permissions = props.permissions ?? [];
  }

  update(props: Partial<RoleProps>) {
    this.updateAllFieldsIfPresent(props);
  }
}
