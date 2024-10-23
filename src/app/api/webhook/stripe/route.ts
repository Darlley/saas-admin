import { stripe } from '@/services/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handleCheckoutSessionCompleted, handleInvoicePaymentSucceeded } from './resources/checkout';
import { createPlan, deletePlan, updatePlan } from './resources/plan';
import { createPrice, deletePrice, updatePrice } from './resources/price';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from './resources/product';

/**
 * Manipula webhooks do Stripe para processar eventos de assinatura.
 * @param req - O objeto de requisição recebido.
 * @returns Uma resposta indicando o sucesso ou falha do processamento do webhook.
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('Evento Stripe recebido:', event.type);
  } catch (error) {
    console.error('Erro na verificação do webhook:', error);
    return new Response('Erro no webhook', { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(session);
      break;
    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(session);
      break;
    case 'product.created':
      await createProduct(event.data.object as Stripe.Product);
      break;
    case 'product.deleted':
      await deleteProduct(event.data.object as Stripe.Product);
      break;
    case 'product.updated':
      await updateProduct(event.data.object as Stripe.Product);
      break;
    case 'plan.created':
      await createPlan(event.data.object as Stripe.Plan);
      break;
    case 'plan.updated':
      await updatePlan(event.data.object as Stripe.Plan);
      break;
    case 'plan.deleted':
      await deletePlan(event.data.object as Stripe.Plan);
      break;
    case 'price.created':
      await createPrice(event.data.object as Stripe.Price);
      break;
    case 'price.deleted':
      await deletePrice(event.data.object as Stripe.Price);
      break;
    case 'price.updated':
      await updatePrice(event.data.object as Stripe.Price);
      break;
    default:
      console.log(`Tipo de evento não tratado: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
