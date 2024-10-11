import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../database"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' }
})