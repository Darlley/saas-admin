'use server';

import { prisma } from '@/services/database';
import { ApiResponse } from '../../types/api-response.types';

export async function verifyEmail(token: string): Promise<ApiResponse> {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    if (!verificationToken) {
      return {
        type: 'error',
        status: 400,
        message: 'Token inválido.',
      };
    }

    const hasExpired = new Date(verificationToken.expires) < new Date();

    if (hasExpired) {
      return {
        type: 'error',
        status: 400,
        message: 'Token expirado.',
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return {
        type: 'error',
        status: 400,
        message: 'Este email não foi encontrado.',
      };
    }

    if (user.emailVerified) {
      return {
        type: 'error',
        status: 400,
        message: 'Este email já foi verificado. Faça login para continuar.',
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: verificationToken.identifier,
      },
    });

    await prisma.verificationToken.delete({
      where: {
        token,
      },
    });

    return {
      type: 'success',
      status: 200,
      message: 'E-mail verificado com sucesso. Faça login para continuar.',
    };
  } catch (error) {
    return {
      type: 'error',
      status: 500,
      message: 'Houve algum erro ao verificar seu e-mail.',
    };
  }
}
