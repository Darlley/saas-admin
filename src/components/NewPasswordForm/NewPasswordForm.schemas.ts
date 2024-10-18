import * as z from 'zod';

export const newPasswordSchema = z
  .object({
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
    confirmPassword: z.string().min(8, {
      message: 'A confirmação deve ter pelo menos 8 caracteres',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não coincidem',
        path: ['confirmPassword'], // Indica onde o erro deve aparecer
      });
    }
  });

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
