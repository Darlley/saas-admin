'use server';

import {
  loginSchema,
  LoginSchema,
} from '@/components/SigninForm/SigninForm.schemas';

export const register = async (values: LoginSchema) => {
  new Promise<void>((resolve) =>
    setTimeout(() => (console.log(values), resolve()), 5000)
  );

  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  return {
    success: 'Email send',
  };
};
