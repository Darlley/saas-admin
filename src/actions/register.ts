'use server';

import {
  registerSchema,
  RegisterSchema,
} from '@/components/SignupForm/SignupForm.schemas';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
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
        message: 'Este email ja esta sendo utilizado!',
      };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    // TODO: Enviar email de verificação do email
    await sendVerificationEmail({
      name,
      from: process.env.EMAIL_FROM,
      to: email,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken.token}`,
      subject: 'Confirme seu e-mail',
    });

    return {
      type: 'success',
      status: 200,
      message: 'Usuário criado. Verifique seu email.',
    };
  } catch (error) {
    return {
      type: 'error',
      status: 500,
      message: 'Internal server error',
    };
  }
};
