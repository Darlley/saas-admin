import { loginSchema } from '@/components/SigninForm/SigninForm.schemas';
import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Linkedin from 'next-auth/providers/linkedin';
import Google from 'next-auth/providers/google';

import { prisma } from '../database';

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Linkedin({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const userExists = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!userExists || !userExists.password) return null;

          const passwordMatch = await compare(
            password,
            userExists.password
          );

          if (passwordMatch) return userExists;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
