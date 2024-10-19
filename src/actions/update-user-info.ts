'use servver';

import { UserUpdateSchema, userUpdateSchema } from '@/components/UserUpdateForm/UserUpdateForm.schemas';
import { prisma } from '@/services/database';
import { ApiResponse } from '../../types/api-response.types';

export async function updateUserInfo(values: UserUpdateSchema): Promise<ApiResponse> {
  const validatedFields = userUpdateSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      type: 'error',
      status: 401,
      message: 'Invalid fields',
    };
  }

  const { name, email, image } = validatedFields.data;

  try {
    const user = await prisma.user.update({
      where: { email },
      data: {
        name,
        email,
        image,
      },
    });

    if (!user) {
      return {
        type: 'error',
        status: 401,
        message: 'Houve um erro ao atualizar as informações do usuário...',
      };
    }

    return {
      type: 'success',
      status: 200,
      message: 'Iformações atualizadas com sucesso!',
    };
  } catch (error) {
    return {
      type: 'error',
      status: 500,
      message: 'Houve um erro ao atualizar as informações do usuário...',
    };
  }
}
