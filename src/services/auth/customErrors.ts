import { AuthError } from "next-auth"

export class EmailNotVerifiedError extends AuthError {
  static type = "EmailNotVerified" as const;
  constructor() {
    super("EmailNotVerified")
    this.name = "EmailNotVerified"
    this.message = "O e-mail não foi verificado. Por favor, verifique seu e-mail antes de fazer login."
  }
}

export class UserNotFoundError extends AuthError {
  static type = "UserNotFound" as const;
  constructor() {
    super("UserNotFound")
    this.name = "UserNotFoundError"
    this.message = "Usuário não encontrado."
  }
}

// Você pode adicionar outros erros personalizados aqui, se necessário