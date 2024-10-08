import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/services/database"
import GitHub from "next-auth/providers/github"
import LinkedIn from "next-auth/providers/linkedin"


 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, LinkedIn],
})