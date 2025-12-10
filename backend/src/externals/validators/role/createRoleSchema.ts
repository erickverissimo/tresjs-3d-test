import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { objectId } from '../shared';

const createRoleSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
  companyId: objectId(z.string()).nullable().optional(),
  permissionsIds: z.array(objectId(z.string())).optional().default([]),
});

export type ICreateRole = z.infer<typeof createRoleSchema>;

export class CreateRoleSchemaValidator extends AbstractValidator {
  public static parse(input: any): ICreateRole {
    return this.safeParse(createRoleSchema, input);
  }
}
