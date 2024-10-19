import * as z from 'zod';

export const userUpdateSchema = z.object({
  name: z.optional(
    z
      .string({
        message: 'Este campo é obrigatório',
      })
      .min(1, {
        message: 'Este campo é obrigatório',
      })
  ),
  email: z.optional(
    z
      .string({
        message: 'Este campo é obrigatório',
      })
      .min(1, {
        message: 'Este campo é obrigatório',
      })
      .email({
        message: 'Email inválido',
      })
  ),
  image: z.optional(z.string().url()),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
