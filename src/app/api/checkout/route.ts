import { auth } from '@/services/auth';
import { prisma } from '@/services/database';
import { stripe } from '@/services/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'PriceId é obrigatório' }, { status: 400 });
    }

    const userId = session.user.id;

    let user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        stripeCustomerId: true,
        email: true,
        name: true
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    let customer;
    if (!user.stripeCustomerId) {
      customer = await stripe.customers.create({
        email: user.email || '',
        name: user.name || '',
      });

      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customer.id },
      });
    } else {
      customer = await stripe.customers.retrieve(user.stripeCustomerId);
    }

    const checkoutSession = await stripe.checkout.sessions.create({        
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: userId,
      customer: customer.id,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=cancelled`,
      billing_address_collection: 'auto',
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro ao processar o checkout' },
      { status: 500 }
    );
  }
}
