import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { nameTransform } from '../transformers/nameTransform';
import { objectId } from '../shared';

const createUserSchema = z.object({
  name: z.string().transform(nameTransform),
  email: z.string().email(),
  roles: z.array(z.string()).min(1),
  phoneNumber: z.string().trim(),
  password: z.string().min(6).nullable().optional(),
});

export type ICreateUser = z.infer<typeof createUserSchema>;

export class CreateUserSchemaValidator extends AbstractValidator {
  public static parse(input: any): ICreateUser {
    return this.safeParse(createUserSchema, input);
  }
}
