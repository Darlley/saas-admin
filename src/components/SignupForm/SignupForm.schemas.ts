import * as z from 'zod';

export const formSchema = z.object({
  firstname: z.string({
    message: 'Este campo é obrigatório',
  }).min(1, {
    message: 'Este campo é obrigatório',
  }),
  lastname: z.string({
    message: 'Este campo é obrigatório',
  }).min(1, {
    message: 'Este campo é obrigatório',
  }),
  email: z.string({
    message: 'Este campo é obrigatório',
  }).email({
    message: 'Insira um endereço de email válido',
  }),
  password: z.string({
    message: 'Este campo é obrigatório',
  }).min(6, {
    message: 'A senha deve ter pelo menos 6 caracteres',
  }),
  twitterpassword: z.string({
    message: 'Este campo é obrigatório',
  }).min(6, {
    message: 'A senha do Twitter deve ter pelo menos 6 caracteres',
  }),
});

export type FormSchema = z.infer<typeof formSchema>;