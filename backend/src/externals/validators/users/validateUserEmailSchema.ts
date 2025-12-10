import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const userEmailSchema = z.object({
  email: z.string(),
});

export type IUserEmail = z.infer<typeof userEmailSchema>;

export class UserEmailSchemaValidator extends AbstractValidator {
  public static parse(input: any): IUserEmail {
    return this.safeParse(userEmailSchema, input);
  }
}
