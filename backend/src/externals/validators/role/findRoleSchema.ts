import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { objectId, optionalBooleanString, optionalString } from '../shared';

const findRoleSchema = z.object({
  id: objectId(z.string()).nullish(),
  idNotEquals: objectId(z.string()).nullish(),
  name: optionalString(),
  nameLike: optionalString(),
});

export type IFindAllRole = z.infer<typeof findRoleSchema>;

export class FindAllRolesSchemaValidator extends AbstractValidator {
  public static parse(input: any): IFindAllRole {
    return this.safeParse(findRoleSchema, input);
  }
}
