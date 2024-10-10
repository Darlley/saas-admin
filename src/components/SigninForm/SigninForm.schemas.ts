import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Este campo é obrigatório',
    })
    .email({
      message: 'Insira um endereço de email válido',
    }),
  password: z.string().min(8, {
    message: 'A senha deve ter pelo menos 8 caracteres',
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
