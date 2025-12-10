import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { pageQuery } from '../shared/pageQuery';
import { limitQuery } from '../shared/limitQuery';
import { objectId, optionalBooleanString, optionalString } from '../shared';

const paginatePermissionSchema = z.object({
  page: pageQuery(),
  limit: limitQuery(),
  id: objectId(z.string()).nullish(),
  idNotEquals: optionalString(),
  resource: optionalString(),
  resources: z.array(objectId(z.string())).optional(),
  action: optionalString(),
  description: optionalString(),
  descriptionLike: optionalString(),
});

export type IPaginatePermission = z.infer<typeof paginatePermissionSchema>;

export class PaginatePermissionSchemaValidator extends AbstractValidator {
  public static parse(input: any): IPaginatePermission {
    return this.safeParse(paginatePermissionSchema, input);
  }
}
