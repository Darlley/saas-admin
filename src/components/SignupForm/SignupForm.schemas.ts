import * as z from 'zod';

export const registerSchema = z.object({
  name: z
    .string({
      required_error: 'Este campo é obrigatório',
    })
    .min(1, {
      message: 'Este campo é obrigatório',
    }),
  email: z
    .string({
      required_error: 'Este campo é obrigatório',
    })
    .email({
      message: 'Insira um endereço de email válido',
    }),
  password: z
    .string()
    .min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/[0-9]/, {
      message: 'A senha deve conter pelo menos um número',
    })
    .regex(/[\W_]/, {
      message: 'A senha deve conter pelo menos um caractere especial',
    }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
