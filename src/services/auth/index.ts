import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../database';
import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    session: ({ session, token }) => {
      console.log({ session: token });

      if (token.sub && session.user) {
        session.user.id = token?.sub;
      }

      return session;
    },
    jwt: ({ token }) => {
      console.log({ jwt: token });
      token.customField = 'Darlley';
      return token;
    },
  },
});
