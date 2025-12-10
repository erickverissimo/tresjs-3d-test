import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { objectId } from '../shared';

const updateRoleSchema = z.object({
  name: z.string().trim().optional(),
  description: z.string().trim(),
  permissionsIds: z.array(objectId(z.string())).optional().default([]),
});

export type IUpdateRole = z.infer<typeof updateRoleSchema>;

export class UpdateRoleSchemaValidator extends AbstractValidator {
  public static parse(input: any): IUpdateRole {
    return this.safeParse(updateRoleSchema, input);
  }
}
