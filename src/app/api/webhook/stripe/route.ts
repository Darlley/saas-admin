import { prisma } from "@/services/database";
import { stripe } from "@/services/stripe";
import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import Stripe from "stripe";

/**
 * Manipula webhooks do Stripe para processar eventos de assinatura.
 * @param req - O objeto de requisição recebido.
 * @returns Uma resposta indicando o sucesso ou falha do processamento do webhook.
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    // Verifica a assinatura do webhook para garantir que veio do Stripe
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    console.error("Erro na verificação do webhook:", error);
    return new Response("Erro no webhook", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(session);
      break;
    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(session);
      break;
    case 'plan.created':
      await handlePlanCreated(event.data.object);
      break;
    case 'plan.deleted':
    case 'plan.updated':
      const plan = event.data.object;
      // Lógica para lidar com eventos de plano
      break;
    case 'product.created':
    case 'product.deleted':
    case 'product.updated':
    case 'price.created':
    case 'price.deleted':
    case 'price.updated':
      const price = event.data.object;
      // Lógica para lidar com eventos de preço
      break;
    default:
      console.log(`Tipo de evento não tratado: ${event.type}`);
  }

  return new Response("Webhook recebido", { status: 200 });
}

/**
 * Manipula o evento de conclusão de checkout.
 * @param session - A sessão de checkout do Stripe.
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
  const customerId = session.customer as string;
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) throw new Error("User not found.");

  
  // Cancela a assinatura anterior, se existir
  const existingSubscription = await prisma.subscription.findUnique({
    where: { stripeId: subscription.id }
  });
  
  // Apaga qualquer assinatura existente do usuário
  await prisma.subscription.deleteMany({
    where: { userId: user.id }
  });
  
  if (existingSubscription) {
    try {
      await stripe.subscriptions.cancel(existingSubscription.stripeId);
    } catch (error) {
      if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        console.warn(`Assinatura não encontrada no Stripe: ${existingSubscription.stripeId}`);
      } else {
        throw error; // Lança outros erros
      }
    }
  }

  const subscriptionData = {
    stripeId: subscription.id,
    userId: user.id,
    currentPeriodStart: subscription.current_period_start,
    currentPeriodEnd: subscription.current_period_end,
    status: subscription.status,
    planId: subscription.items.data[0].price.id,
    interval: String(subscription.items.data[0].plan.interval),
  };

  // Atualiza ou cria uma nova assinatura no banco de dados
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
async function handleInvoicePaymentSucceeded(session: Stripe.Checkout.Session) {
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
  const customerId = session.customer as string;

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error("Usuário não encontrado para o customerId:", customerId);
    return;
  }

  const subscriptionData = {
    stripeId: subscription.id,
    userId: user.id,
    currentPeriodStart: subscription.current_period_start,
    currentPeriodEnd: subscription.current_period_end,
    status: subscription.status,
    planId: subscription.items.data[0].price.id,
    interval: String(subscription.items.data[0].plan.interval),
  };

  try {
    // Tenta atualizar a assinatura existente
    await prisma.subscription.update({
      where: { stripeId: subscription.id },
      data: subscriptionData,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      // Se a assinatura não existir, cria uma nova
      await prisma.subscription.create({
        data: subscriptionData,
      });
    } else {
      // Se for outro tipo de erro, lança novamente
      console.error('Erro ao atualizar/criar assinatura:', error);
      throw error;
    }
  }
}

async function handleProductCreated(customer: Stripe.Customer) {
}