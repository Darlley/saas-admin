import { prisma } from "@/services/database";
import Stripe from "stripe";

/**
 * Manipula o evento de criação de preço.
 * @param price - O preço do Stripe.
 */
export async function createPrice(price: Stripe.Price) {
  try {
    const product = await prisma.product.findUnique({
      where: { stripeId: price.product as string },
    });

    if (!product) {
      console.log(`Produto ${price.product} não encontrado. Aguardando criação.`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return createPrice(price);
    }

    const createdPrice = await prisma.price.create({
      data: {
        stripePriceId: price.id,
        amount: price.unit_amount ? price.unit_amount / 100 : 0,
        interval: price.recurring?.interval || 'one_time',
        product: { connect: { id: product.id } },
      },
    });
    console.log(`Preço criado com sucesso: ${createdPrice.stripePriceId}`);
    return createdPrice;
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
    // Ao invés de deletar, podemos marcar como inativo ou fazer soft delete
    const deletedPrice = await prisma.price.update({
      where: { stripePriceId: price.id },
      data: { 
        active: false,
        subscriptions: {
          updateMany: {
            where: { status: { not: 'canceled' } },
            data: { status: 'canceled' }
          }
        }
      },
    });
    console.log(`Preço marcado como inativo: ${deletedPrice.stripePriceId}`);
    return deletedPrice;
  } catch (error) {
    console.error(`Erro ao marcar preço como inativo ${price.id}:`, error);
    throw error;
  }
}

/**
 * Manipula o evento de atualização de preço.
 * @param price - O preço do Stripe.
 */
export async function updatePrice(price: Stripe.Price) {
  try {
    const updatedPrice = await prisma.price.update({
      where: { stripePriceId: price.id },
      data: {
        amount: price.unit_amount ? price.unit_amount / 100 : 0,
        interval: price.recurring?.interval || 'one_time',
      },
    });
    console.log(`Preço atualizado com sucesso: ${updatedPrice.stripePriceId}`);
    return updatedPrice;
  } catch (error) {
    console.error(`Erro ao atualizar preço ${price.id}:`, error);
    throw error;
  }
}
