import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { objectId, optionalBooleanString, optionalString } from '../shared';

const findPermissionSchema = z.object({
  id: objectId(z.string()).nullish(),
  idNotEquals: objectId(z.string()).nullish(),
  resource: optionalString(),
  resources: z.array(objectId(z.string())).optional(),
  action: optionalString(),
  description: optionalString(),
  descriptionLike: optionalString(),
});

export type IFindAllPermission = z.infer<typeof findPermissionSchema>;

export class FindAllPermissionsSchemaValidator extends AbstractValidator {
  public static parse(input: any): IFindAllPermission {
    return this.safeParse(findPermissionSchema, input);
  }
}
