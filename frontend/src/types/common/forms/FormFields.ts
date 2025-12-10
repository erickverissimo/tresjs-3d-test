import { FieldContext } from 'vee-validate';

export type FormFields<T> = {
  [K in keyof T]: T[K] extends Array<infer U> // Verifica se é um array
    ? U extends Record<string, any> // Se os elementos forem objetos
      ? FieldContext<FormFields<U>[]> // Aplica FieldContext no array de objetos
      : FieldContext<U[]> // Aplica FieldContext diretamente para arrays de valores primitivos
    : T[K] extends Date // Se for Date, aplica FieldContext<Date>
    ? FieldContext<Date>
    : T[K] extends Record<string, any> // Se for um objeto, aplica FormFields recursivamente
    ? FormFields<T[K]>
    : FieldContext<T[K]>; // Caso contrário, aplica FieldContext diretamente
};
