import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { nameTransform } from '../transformers/nameTransform';
import { objectId } from '../shared';

const updateUserSchema = z.object({
  name: z.string().transform(nameTransform),
  email: z.string().email(),
  roles: z.array(z.string()).min(1),
  phoneNumber: z.string().trim(),
  password: z.string().min(6).nullable().optional(),
});

export type IUpdateUser = z.infer<typeof updateUserSchema>;

export class UpdateUserSchemaValidator extends AbstractValidator {
  public static parse(input: any): IUpdateUser {
    return this.safeParse(updateUserSchema, input);
  }
}
