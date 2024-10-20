import { prisma } from "@/services/database";
import Stripe from "stripe";

/**
 * Manipula o evento de criação de preço.
 * @param price - O preço do Stripe.
 */
export async function createPrice(price: Stripe.Price) {
  try {
    await prisma.price.create({
      data: {
        stripePriceId: price.id,
        amount: price.unit_amount ? price.unit_amount / 100 : 0, // Convertendo para float
        interval: price.recurring?.interval || 'one_time',
        product: { connect: { stripeId: price.product as string } },
        subscription: { connect: { stripeId: price.id } }, // Isso pode precisar de ajuste dependendo da lógica do seu aplicativo
      },
    });
    console.log(`Preço criado com sucesso: ${price.id}`);
  } catch (error) {
    console.error(`Erro ao criar preço ${price.id}:`, error);
    throw error;
  }
}

/**
 * Manipula o evento de exclusão de preço.
 * @param price - O preço do Stripe.
 */
export async function deletePrice(price: Stripe.Price) {
  try {
    await prisma.price.delete({
      where: { stripePriceId: price.id },
    });
    console.log(`Preço excluído com sucesso: ${price.id}`);
  } catch (error) {
    console.error(`Erro ao excluir preço ${price.id}:`, error);
    throw error;
  }
}

/**
 * Manipula o evento de atualização de preço.
 * @param price - O preço do Stripe.
 */
export async function updatePrice(price: Stripe.Price) {
  try {
    await prisma.price.update({
      where: { stripePriceId: price.id },
      data: {
        amount: price.unit_amount ? price.unit_amount / 100 : 0, // Convertendo para float
        interval: price.recurring?.interval || 'one_time',
        product: { connect: { stripeId: price.product as string } },
      },
    });
    console.log(`Preço atualizado com sucesso: ${price.id}`);
  } catch (error) {
    console.error(`Erro ao atualizar preço ${price.id}:`, error);
    throw error;
  }
}