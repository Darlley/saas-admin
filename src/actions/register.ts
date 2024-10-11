'use server';

import {
  registerSchema,
  RegisterSchema,
} from '@/components/SignupForm/SignupForm.schemas';
import { prisma } from '@/services/database';
import bcrypt from 'bcrypt';
import { ApiResponse } from '../../types/api-response.types';

export const register = async (
  values: RegisterSchema
): Promise<ApiResponse> => {
  try {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        type: 'error',
        status: 401,
        message: 'Invalid fields',
      };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return {
        type: 'error',
        status: 409,
        message: 'Email already in use!',
      };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: Enviar email de verificação do email

    return {
      type: 'success',
      status: 200,
      message: 'User created',
    };
  } catch (error) {
    console.error('Error during registration:', error);
    return {
      type: 'error',
      status: 500,
      message: 'Internal server error',
    };
  }
};
