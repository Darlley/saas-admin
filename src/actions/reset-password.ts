"use server"

import { resetSchema, ResetSchema } from "@/components/ResetPasswordForm/ResetPasswordForm.schemas"
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

  return {
    type: 'success',
    status: 200,
    message: 'Email de recuperação enviado com sucesso!',
  };
}