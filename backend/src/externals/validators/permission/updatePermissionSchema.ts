import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const updatePermissionSchema = z.object({
  resource: z.string().trim(),
  action: z.string().trim(),
  description: z.string().trim(),
});

export type IUpdatePermission = z.infer<typeof updatePermissionSchema>;

export class UpdatePermissionSchemaValidator extends AbstractValidator {
  public static parse(input: any): IUpdatePermission {
    return this.safeParse(updatePermissionSchema, input);
  }
}
