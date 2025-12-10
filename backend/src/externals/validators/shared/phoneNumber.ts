import { z } from 'zod';
import { validatePhoneNumber } from './phoneNumberValidator';

export const optionalPhoneNumberSchema = () =>
  z
    .string()
    .nullable()
    .transform((val) => (val ? val.replace(/\D/g, '') : val))
    .refine((val) => (val ? validatePhoneNumber(val) : true));

export const phoneNumberSchema = () =>
  z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => validatePhoneNumber(val));
