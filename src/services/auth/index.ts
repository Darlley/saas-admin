import NextAuth, { AuthError, type DefaultSession } from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import { prisma } from '../database';
import authConfig from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: UserRole; // Adiciona a propriedade role
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    signIn: async ({ user }) => {
      const userDb = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!userDb || !userDb.emailVerified) return false;

      return true;
    },
    session: ({ session, token }) => {
      console.log({ session: token });

      if (token.sub && session.user) {
        session.user.id = token?.sub;
      }

      if (token.role && session.user) {
        session.user.role = token?.role as UserRole;
      }

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const user = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!user) return token;
      token.role = user?.role;

      return token;
    },
  },
});
