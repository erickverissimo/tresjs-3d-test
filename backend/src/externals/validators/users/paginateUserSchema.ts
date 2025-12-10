import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { pageQuery } from '../shared/pageQuery';
import { limitQuery } from '../shared/limitQuery';
import { objectId, optionalString } from '../shared';

const paginateUserSchema = z.object({
  page: pageQuery(),
  limit: limitQuery(),
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

export type IPaginateUser = z.infer<typeof paginateUserSchema>;

export class PaginateUserSchemaValidator extends AbstractValidator {
  public static parse(input: any): IPaginateUser {
    return this.safeParse(paginateUserSchema, input);
  }
}
