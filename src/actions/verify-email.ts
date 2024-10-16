'use server';

import { prisma } from '@/services/database';
import { ApiResponse } from '../../types/api-response.types';

export async function verifyEmail(token: string): Promise<ApiResponse> {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { identifier_token: { identifier: token, token } },
    });

    if (!verificationToken) {
      return {
        type: 'error',
        status: 400,
        message: 'Token inválido',
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return {
        type: 'error',
        status: 400,
        message: 'Usuário não encontrado',
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: { identifier_token: { identifier: token, token } },
    });

    return {
      type: 'success',
      status: 200,
      message: 'E-mail verificado com sucesso',
    };
  } catch (error) {
    console.error('Erro ao verificar e-mail:', error);
    return {
      type: 'error',
      status: 500,
      message: 'Erro interno do servidor',
    };
  }
}