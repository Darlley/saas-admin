import * as z from 'zod';

export const userUpdateSchema = z.object({
  name: z
    .string({
      message: 'Este campo é obrigatório',
    })
    .min(1, {
      message: 'Este campo é obrigatório',
    }),
  email: z
    .string({
      message: 'Este campo é obrigatório',
    })
    .min(1, {
      message: 'Este campo é obrigatório',
    })
    .email({
      message: 'Email inválido',
    }),
  image: z.string().optional(),
});
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
