import * as z from 'zod';

export const formSchema = z.object({
  name: z.string({
      message: 'Este campo é obrigaório',
    }).min(1, {
      message: 'Este campo é obrigaório',
    }),
});
export type FormSchema = z.infer<typeof formSchema>;