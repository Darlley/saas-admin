import * as z from 'zod';

export const formSchema = z.object({
  email: z.string({
    required_error: 'Este campo é obrigatório',
  }).email({
    message: 'Insira um endereço de email válido',
  }),
  password: z.string()
});

export type FormSchema = z.infer<typeof formSchema>;