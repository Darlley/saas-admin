import { prisma } from '@/services/database';
import { Prisma } from '@prisma/client';
import Stripe from 'stripe';

/**
 * Manipula o evento de criação de produto.
 * @param product - O produto do Stripe.
 */
export async function createProduct(product: Stripe.Product) {
  console.log('Iniciando handleProductCreated');
  console.log('Produto recebido:', JSON.stringify(product, null, 2));
  try {
    const createdProduct = await prisma.product.create({
      data: {
        stripeId: product.id,
        name: product.name,
        description: product.description || undefined,
        active: product.active,
      },
    });
    console.log(
      `Produto criado com sucesso no banco de dados:`,
      createdProduct
    );
  } catch (error) {
    console.error(`Erro ao criar produto ${product.id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Código do erro Prisma: ${error.code}`);
    }
    throw error;
  }
}

/**
 * Manipula o evento de exclusão de produto.
 * @param product - O produto do Stripe.
 */
export async function deleteProduct(product: Stripe.Product) {
  try {
    await prisma.product.delete({
      where: { stripeId: product.id },
    });
    console.log(`Produto excluído com sucesso: ${product.id}`);
  } catch (error) {
    console.error(`Erro ao excluir produto ${product.id}:`, error);
    throw error;
  }
}

/**
 * Manipula o evento de atualização de produto.
 * @param product - O produto do Stripe.
 */
export async function updateProduct(product: Stripe.Product) {
  console.log("features", product.marketing_features);
  try {
    await prisma.product.update({
      where: { stripeId: product.id },
      data: {
        name: product.name,
        description: product.description || undefined,
        active: product.active,
      },
    });
    console.log(`Produto atualizado com sucesso: ${product.id}`);
  } catch (error) {
    console.error(`Erro ao atualizar produto ${product.id}:`, error);
    throw error;
  }
}
