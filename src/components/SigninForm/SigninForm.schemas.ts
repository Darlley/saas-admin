import * as z from 'zod';

export const formSchema = z.object({
  email: z.string({
    message: 'Este campo é obrigatório',
  }).email({
    message: 'Insira um endereço de email válido',
  }),
});

export type FormSchema = z.infer<typeof formSchema>;