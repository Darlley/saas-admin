import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import { prisma } from '../database';
import authConfig from './auth.config';
import { EmailNotVerifiedError } from './customErrors';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
      
      if (account?.type === 'credentials') {
        const userDb = await prisma.user.findUnique({
          where: { id: user.id },
          select: { emailVerified: true },
        });

        if (!userDb?.emailVerified) {
          throw new EmailNotVerifiedError();
        }
      }

      return true;
    },
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token?.sub;
      }

      if (token.role && session.user) {
        session.user.role = token?.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await prisma.user.findUnique({
        where: { id: token.sub },
        select: { role: true }, // Selecione apenas o campo necessário
      });

      if (user) {
        token.role = user.role;
      }

      return token;
    },
  },
});
