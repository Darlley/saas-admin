import { auth } from '@/services/auth';
import { prisma } from '@/services/database';
import { stripe } from '@/services/stripe';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Cria uma sessão de checkout do Stripe para uma assinatura.
 * 
 * Este método realiza as seguintes operações:
 * 1. Valida o priceId recebido na requisição
 * 2. Configura os dados da sessão de checkout, incluindo URLs de sucesso e cancelamento
 * 3. Verifica se o usuário está autenticado e associa o Stripe Customer ID a ele, 
 * 4. Se o usuario não estiver autenticado cria o checkout mesmo assim, o Stripe cria o customer automaticamente
 * 5. Cria uma sessão de checkout no Stripe
 * 6. Retorna a URL do checkout ou um erro em caso de falha
 * 
 * @param request - Objeto NextRequest contendo os dados da requisição
 * @returns Uma resposta JSON com a URL da sessão de checkout ou uma mensagem de erro
 * 
 * NOTA: O Stripe cria automaticamente um customer para compras sem conta. Ao criar uma conta com o mesmo email da compra, associamos a assinatura existente ao novo usuário.
 */
export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'PriceId é obrigatório' }, { status: 400 });
    }

    let checkoutSessionData: any = {
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    };

    const session = await auth();

    // Adiciona client_reference_id e customer apenas se o usuário estiver autenticado e já existir no banco de dados
    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { stripeCustomerId: true },
      });

      if (user?.stripeCustomerId) {
        checkoutSessionData.client_reference_id = session.user.id;
        checkoutSessionData.customer = user.stripeCustomerId;
        checkoutSessionData.success_url = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`;
        checkoutSessionData.cancel_url = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=cancelled`;
      }
    } else {
      checkoutSessionData.success_url = `${process.env.NEXT_PUBLIC_APP_URL}/register?session_id={CHECKOUT_SESSION_ID}`;
      checkoutSessionData.cancel_url = `${process.env.NEXT_PUBLIC_APP_URL}/payment=cancelled`;
    }

    const checkoutSession = await stripe.checkout.sessions.create(checkoutSessionData);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro ao processar o checkout', details: (error as Error).message },
      { status: 500 }
    );
  }
}
