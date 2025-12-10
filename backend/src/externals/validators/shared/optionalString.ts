import { z } from 'zod';
import { emptyStringToNull } from '../transformers';

export const optionalString = (arg: z.ZodString = z.string()) =>
  arg.trim().nullish().transform(emptyStringToNull);
