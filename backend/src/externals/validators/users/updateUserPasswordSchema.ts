import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const updateUserPasswordSchema = z.object({
  id: z.string().trim(),
  password: z.string().trim().min(6),
  passwordTokenRecovery: z.string().trim(),
});

export type IUpdateUserPassword = z.infer<typeof updateUserPasswordSchema>;

export class UpdateUserPasswordSchemaValidator extends AbstractValidator {
  public static parse(input: any): IUpdateUserPassword {
    return this.safeParse(updateUserPasswordSchema, input);
  }
}
