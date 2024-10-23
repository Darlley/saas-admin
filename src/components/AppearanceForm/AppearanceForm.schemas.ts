import * as z from 'zod';

export const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Por favor, selecione o tema.",
  }),
});
export type AppearanceFormSchema = z.infer<typeof appearanceFormSchema>;