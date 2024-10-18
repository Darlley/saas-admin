"use server"

import bcrypt from "bcryptjs";
import { prisma } from "@/services/database";
import { ApiResponse } from "../../types/api-response.types";
import { newPasswordSchema, NewPasswordSchema } from "@/components/NewPasswordForm/NewPasswordForm.schemas";

export async function newPassword(token: string, values: NewPasswordSchema): Promise<ApiResponse> {
  try {
    const validatedFields = newPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        type: 'error',
        status: 401,
        message: 'Campos inválidos.',
      };
    }
    
    const verificationToken = await prisma.resetPasswordToken.findUnique({
      where: {
        token,
      },
    });

    if (!verificationToken) {
      return {
        type: 'error',
        status: 400,
        message: 'Token inválido.',
      };
    }

    const hasExpired = new Date(verificationToken.expires) < new Date();

    if (hasExpired) {
      return {
        type: 'error',
        status: 400,
        message: 'Token expirado.',
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email },
    });

    if (!user) {
      return {
        type: 'error',
        status: 400,
        message: 'Este email não foi encontrado.',
      };
    }

    const { password } = validatedFields.data;

    const passwordHashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordHashed,
      },
    });

    return {
      type: 'success',
      status: 200,
      message: 'Senha alterada com sucesso. Faça login para continuar.',
    };
  } catch (error) {
    return {
      type: 'error',
      status: 500,
      message: 'Houve algum erro ao verificar seu e-mail.',
    };
  }
}