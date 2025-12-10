import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .email('Insira um e-mail válido')
    .required('Insira seu e-mail de acesso'),
  password: yup.string().required('Insira sua senha de acesso'),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
