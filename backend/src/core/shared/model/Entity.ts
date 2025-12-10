export interface EntityJson {
  id: string | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
}

export interface EntityProps {
  id?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  deletedAt?: Date | null;
}

export abstract class Entity<T extends EntityProps = any> {
  readonly id: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly isDeleted: boolean;
  readonly deletedAt: Date | null;

  constructor(props: T) {
    this.id = props.id ?? null;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.isDeleted = props.isDeleted ?? false;
    this.deletedAt = props.deletedAt ?? null;
  }

  public equals(entity: Entity): boolean {
    return this.id === entity.id;
  }

  public notEquals(entity: Entity): boolean {
    return !this.equals(entity);
  }

  public toJSON(): EntityJson {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }

  protected updateFieldIfPresent(
    field: keyof T,
    value: T[keyof T] | undefined
  ) {
    if (value !== undefined) {
      (this as any)[field] = value;
    }
  }

  protected updateAllFieldsIfPresent(
    fields: Partial<T>,
    allowedFields?: (keyof T)[]
  ) {
    for (const [key, value] of Object.entries(fields)) {
      if (!allowedFields || allowedFields.includes(key as keyof T)) {
        this.updateFieldIfPresent(key as keyof T, value);
      }
    }
  }
}
