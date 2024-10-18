import * as z from 'zod';

export const resetSchema = z.object({
  email: z
    .string({
      required_error: 'Este campo é obrigatório',
    })
    .email({
      message: 'Insira um endereço de email válido',
    }),
});
export type ResetSchema = z.infer<typeof resetSchema>;