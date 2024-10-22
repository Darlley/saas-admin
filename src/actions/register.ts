'use server';

import {
  registerSchema,
  RegisterSchema,
} from '@/components/SignupForm/SignupForm.schemas';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { prisma } from '@/services/database';
import bcrypt from 'bcrypt';
import { ApiResponse } from '../../types/api-response.types';
import { stripe } from '@/services/stripe';
import Stripe from 'stripe';

const RESEND_KEY = process.env.AUTH_RESEND_KEY!

/**
 * Registra um novo usuário no sistema.
 * 
 * Este método realiza as seguintes operações:
 * 1. Valida os campos de entrada
 * 2. Verifica se o usuário já existe
 * 3. Cria um novo usuário no banco de dados
 * 4. Busca ou cria um cliente Stripe associado ao usuário
 * 5. Atualiza o usuário com o ID do cliente Stripe
 * 6. Envia um e-mail de verificação (se configurado)
 * 
 * @param values - Objeto contendo os dados de registro (nome, email, senha)
 * @returns Uma promessa que resolve para um objeto ApiResponse indicando o resultado da operação
 */
export const register = async (
  values: RegisterSchema
): Promise<ApiResponse> => {
  try {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        type: 'error',
        status: 401,
        message: 'Invalid fields',
      };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return {
        type: 'error',
        status: 409,
        message: 'Este email ja esta sendo utilizado!',
      };
    }

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Buscar cliente Stripe existente com assinatura ativa ou criar um novo
    let stripeCustomerId: string;
    const existingCustomers = await stripe.customers.list({ email: email });

    const customerWithActiveSubscription = await findCustomerWithActiveSubscription(existingCustomers.data);

    if (customerWithActiveSubscription) {
      stripeCustomerId = customerWithActiveSubscription.id;
    } else {
      const newCustomer = await stripe.customers.create({
        email: email,
        name: name,
      });
      stripeCustomerId = newCustomer.id;
    }

    // Atualizar o usuário com o Stripe Customer ID
    await prisma.user.update({
      where: { id: createdUser.id },
      data: { stripeCustomerId: stripeCustomerId },
    });

    if (RESEND_KEY) {
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail({
        name,
        from: process.env.EMAIL_FROM || '', // Verifica se EMAIL_FROM está definido
        to: email,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken.token}`,
        subject: 'Confirme seu e-mail',
      });
    }

    return {
      type: 'success',
      status: 200,
      message: 'Usuário criado. Verifique seu email.',
    };
  } catch (error) {
    return {
      type: 'error',
      status: 500,
      message: 'Internal server error',
    };
  }
};

/**
 * Busca um cliente Stripe com uma assinatura ativa.
 * 
 * Este método percorre uma lista de clientes Stripe e verifica se algum deles
 * possui uma assinatura ativa. Retorna o primeiro cliente encontrado com uma
 * assinatura ativa ou null se nenhum for encontrado.
 * 
 * @param customers - Array de objetos Stripe.Customer para verificar
 * @returns Uma promessa que resolve para um Stripe.Customer com assinatura ativa ou null
 */
async function findCustomerWithActiveSubscription(customers: Stripe.Customer[]): Promise<Stripe.Customer | null> {
  for (const customer of customers) {
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
    });

    if (subscriptions.data.length > 0) {
      return customer;
    }
  }
  return null;
}
