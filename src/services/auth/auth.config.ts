import { loginSchema } from '@/components/SigninForm/SigninForm.schemas';
import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Linkedin from 'next-auth/providers/linkedin';
import { prisma } from '../database';
import { UserNotFoundError } from './customErrors';

export default {
  providers: [
    Github,
    Linkedin,
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
