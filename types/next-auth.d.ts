import { UserRole } from "@prisma/client";
import { AuthError } from "next-auth"

declare module 'next-auth' {
  interface Session {
    user: {
      role?: UserRole; // Adiciona a propriedade role
    } & DefaultSession['user'];
  }
}

declare module 'next-auth' {
  interface AuthErrorType {
    EmailNotVerified: 'EmailNotVerified';
  }
}

declare module 'next-auth' {
  interface AuthErrorType {
    UserNotFound: 'UserNotFound';
  }
}
