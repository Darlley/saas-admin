'use server';

import {
  loginSchema,
  LoginSchema,
} from '@/components/SigninForm/SigninForm.schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants/public-routes';
import { signIn } from '@/services/auth';
import { AuthError } from 'next-auth';

export const login = async (values: LoginSchema) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      type: 'error',
      status: 401,
      message: 'Invalid fields',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            type: 'error',
            status: 401,
            message: 'User not found!',
          };
        default:
          return {
            type: 'error',
            status: 500,
            message: 'Something went wrong!',
          };
      }
    }

    throw error;
  }
};
