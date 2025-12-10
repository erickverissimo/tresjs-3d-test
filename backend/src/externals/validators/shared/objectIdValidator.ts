import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const objectId = (arg: z.ZodString, message = 'Invalid Id format') =>
  arg.regex(objectIdRegex, message);
