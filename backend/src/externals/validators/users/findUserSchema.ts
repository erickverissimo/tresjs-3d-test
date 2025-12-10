import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { objectId, optionalBooleanString, optionalString } from '../shared';

const findUserSchema = z.object({
  id: objectId(z.string()).nullish(),
  idNotEquals: objectId(z.string()).nullish(),
  name: optionalString(),
  nameLike: optionalString(),
  email: optionalString(z.string().email()),
  emailNotEquals: optionalString(z.string().email()),
  phone: optionalString(),
  role: optionalString(),
  searchFilter: optionalString(),
});

export type IFindAllUser = z.infer<typeof findUserSchema>;

export class FindAllUsersSchemaValidator extends AbstractValidator {
  public static parse(input: any): IFindAllUser {
    return this.safeParse(findUserSchema, input);
  }
}
