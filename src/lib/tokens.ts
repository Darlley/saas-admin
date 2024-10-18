import { prisma } from '@/services/database';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  /**
   * Calcula a data de expiração
   * 1 hora em milissegundos
   * 
   * Atualmente esta configurado para 24 horas em desenvolvimento
   * Mude para 1 hora em produção.
   */
  
  // const EXPIRATION_TIME_MS = 86400 * 1000; // TODO: 24 horas
  const EXPIRATION_TIME_MS = 3600 * 1000; // TODO: 1 hora

  const expires = new Date(Date.now() + EXPIRATION_TIME_MS);

  const verificationTokenExists = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
    },
  });

  if (verificationTokenExists) {
    await prisma.verificationToken.delete({
      where: { 
        identifier_token: {
          identifier: email,
          token: verificationTokenExists.token,
        }
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();

  const EXPIRATION_TIME_MS = 3600 * 1000; // 1 hora
  const expires = new Date(Date.now() + EXPIRATION_TIME_MS);

  const resetPasswordTokenExists = await prisma.resetPasswordToken.findFirst({
    where: {
      email,
    },
  });

  if (resetPasswordTokenExists) {
    await prisma.resetPasswordToken.delete({
      where: {
        email,
      },
    });
  }

  const resetPasswordToken = await prisma.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return resetPasswordToken;
};