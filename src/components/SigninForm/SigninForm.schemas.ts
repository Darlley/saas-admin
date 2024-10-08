import * as z from 'zod';

export const formSchema = z.object({
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
});

export type FormSchema = z.infer<typeof formSchema>;