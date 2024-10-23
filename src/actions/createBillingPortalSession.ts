'use server'

import { prisma } from "@/services/database";
import { stripe } from "@/services/stripe";

export async function createBillingPortalSession(userId: string) {
  if (!userId) {
    throw new Error('ID do usuário é obrigatório.');
  }

  const userExists = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  if (!userExists) {
    throw new Error('Usuário não encontrado.');
  }
  
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: userExists.stripeCustomerId as string,
      return_url: process.env.NEXT_PUBLIC_APP_URL + '/dashboard/settings/billing',
    });

    return session.url;
  } catch (error) {
    console.error('Erro ao criar sessão do portal de faturamento:', error);
    throw new Error('Erro ao criar sessão do portal de faturamento');
  }
}
