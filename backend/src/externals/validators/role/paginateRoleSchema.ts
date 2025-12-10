import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { pageQuery } from '../shared/pageQuery';
import { limitQuery } from '../shared/limitQuery';
import { objectId, optionalBooleanString, optionalString } from '../shared';

const paginateRoleSchema = z.object({
  page: pageQuery(),
  limit: limitQuery(),
  id: objectId(z.string()).nullish(),
  idNotEquals: objectId(z.string()).nullish(),
  name: optionalString(),
  nameLike: optionalString(),
});

export type IPaginateRole = z.infer<typeof paginateRoleSchema>;

export class PaginateRoleSchemaValidator extends AbstractValidator {
  public static parse(input: any): IPaginateRole {
    return this.safeParse(paginateRoleSchema, input);
  }
}
