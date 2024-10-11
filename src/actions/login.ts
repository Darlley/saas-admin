'use server';

import {
  loginSchema,
  LoginSchema,
} from '@/components/SigninForm/SigninForm.schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants/public-routes';
import { signIn } from '@/services/auth';
import { UserNotFoundError } from '@/services/auth/customErrors';
import { AuthError } from 'next-auth';
import { EmailNotVerifiedError } from '../services/auth/customErrors';

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
    console.log("ERROR", error);
    if (error instanceof EmailNotVerifiedError) {
      return {
        type: 'error',
        status: 401,
        message: error.message,
      };
    } else if (error instanceof UserNotFoundError) {
      return {
        type: 'error',
        status: 401,
        message: error.message,
      };
    } else if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return {
          type: 'error',
          status: 401,
          message: 'Credenciais inválidas!',
        };
      }
    }
    
    return {
      type: 'error',
      status: 500,
      message: 'Algo deu errado durante a autenticação.',
    };
  }
};
