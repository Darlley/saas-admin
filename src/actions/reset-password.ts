"use server"

import { resetSchema, ResetSchema } from "@/components/ResetPasswordForm/ResetPasswordForm.schemas"
import { sendPasswordResetEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/tokens";
import { prisma } from "@/services/database";

export async function resetPassword(values: ResetSchema) {
  const validatedFields = resetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      type: 'error',
      status: 401,
      message: 'Invalid fields',
    };
  }

  const { email } = validatedFields.data;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExists) {
    return {
      type: 'error',
      status: 401,
      message: 'Usuário não encontrado!',
    };
  }

  const resetPasswordToken = await generateResetPasswordToken(email);

  await sendPasswordResetEmail({
    name: userExists.name ?? email,
    from: process.env.EMAIL_FROM,
    to: email,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/new-password?token=${resetPasswordToken.token}`,
    subject: 'Redefinição de senha',
  });

  return {
    type: 'success',
    status: 200,
    message: 'Email de recuperação enviado com sucesso!',
  };
}