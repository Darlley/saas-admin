import { prisma } from "@/services/database";
import { stripe } from "@/services/stripe";
import Stripe from "stripe";

/**
 * Manipula o evento de conclusão de checkout.
 * @param session - A sessão de checkout do Stripe.
 */
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const subscriptionId = session.subscription as string;
  const customerId = session.customer as string;

  // Busca a assinatura e o usuário em paralelo
  const [subscription, user] = await Promise.all([
    stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product']
    }),
    prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
      select: { id: true }
    })
  ]);

  if (!user) {
    console.log(`Usuário não encontrado para o customerId: ${customerId}. Isso é esperado para compras sem conta.`);
    // Aqui você pode decidir se quer criar um registro temporário ou simplesmente retornar
    return;
  }

  // Procura o item principal da assinatura
  const mainSubscriptionItem = subscription.items.data.find(item => item.price.type === 'recurring');
  
  if (!mainSubscriptionItem) {
    throw new Error(`Nenhum item de assinatura recorrente encontrado para a assinatura: ${subscriptionId}`);
  }

  // Busca o preço no banco de dados
  const price = await prisma.price.findUnique({
    where: { stripePriceId: mainSubscriptionItem.price.id },
    select: { id: true }
  });

  if (!price) {
    throw new Error(`Preço não encontrado para o stripePriceId: ${mainSubscriptionItem.price.id}`);
  }

  // Prepara os dados da nova assinatura
  const subscriptionData = {
    stripeId: subscription.id,
    interval: String(mainSubscriptionItem.plan.interval),
    status: subscription.status,
    currentPeriodStart: Math.floor(subscription.current_period_start),
    currentPeriodEnd: Math.floor(subscription.current_period_end),
    userId: user.id,
    priceId: price.id
  };

  // Atualiza ou cria a assinatura no banco de dados
  await prisma.subscription.upsert({
    where: { stripeId: subscription.id },
    update: subscriptionData,
    create: subscriptionData,
  });
}


/**
 * Manipula o evento de pagamento de fatura bem-sucedido.
 * @param session - A sessão de checkout do Stripe.
 */
export async function handleInvoicePaymentSucceeded(session: Stripe.Checkout.Session) {
  // Recupera os detalhes atualizados da assinatura do Stripe
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  // Extrai o ID do cliente da sessão
  const customerId = session.customer as string;

  // Busca o usuário no banco de dados usando o ID do cliente do Stripe
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  // Verifica se o usuário foi encontrado
  if (!user) {
    console.error('Usuário não encontrado para o customerId:', customerId);
    return;
  }

  // Prepara os dados da assinatura para atualização ou criação
  const subscriptionData = {
    stripeId: subscription.id,
    interval: String(subscription.items.data[0].plan.interval),
    status: subscription.status,
    currentPeriodStart: subscription.current_period_start,
    currentPeriodEnd: subscription.current_period_end,
    userId: user.id,
  }

  // Atualiza ou cria a assinatura no banco de dados
  await prisma.subscription.upsert({
    where: { stripeId: subscription.id },
    update: subscriptionData,
    create: subscriptionData,
  });
}
