import { z } from 'zod';

export function nameTransform(arg: string, ctx: z.RefinementCtx) {
  return arg.trim();
}
