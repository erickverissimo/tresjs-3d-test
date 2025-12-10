import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const createPermissionSchema = z.object({
  resource: z.string().trim(),
  action: z.string().trim(),
  description: z.string().trim(),
});

export type ICreatePermission = z.infer<typeof createPermissionSchema>;

export class CreatePermissionSchemaValidator extends AbstractValidator {
  public static parse(input: any): ICreatePermission {
    return this.safeParse(createPermissionSchema, input);
  }
}
