import { prisma } from '@/services/database';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  /**
   * Calcula a data de expiração usando uma constante para o tempo de vida
   * 1 hora em milissegundos
   */
  const EXPIRATION_TIME_MS = 3600 * 1000;

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
