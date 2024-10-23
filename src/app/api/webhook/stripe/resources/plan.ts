import { prisma } from "@/services/database";
import Stripe from "stripe";

export async function createPlan(plan: Stripe.Plan) {
  try {
    const product = await prisma.product.findUnique({
      where: { stripeId: plan.product as string },
    });

    if (!product) {
      console.log(`Produto ${plan.product} não encontrado. Aguardando criação.`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return createPlan(plan);
    }

    const createdPlan = await prisma.plan.create({
      data: {
        stripeId: plan.id,
        productId: product.id,
        nickname: plan.nickname || undefined,
        amount: plan.amount ? plan.amount / 100 : 0,
        currency: plan.currency,
        interval: plan.interval,
        intervalCount: plan.interval_count,
        active: true,
      },
    });
    console.log(`Plano criado com sucesso: ${createdPlan.stripeId}`);
    return createdPlan;
  } catch (error) {
    console.error(`Erro ao criar plano ${plan.id}:`, error);
    throw error;
  }
}

export async function updatePlan(plan: Stripe.Plan) {
  try {
    const updatedPlan = await prisma.plan.update({
      where: { stripeId: plan.id },
      data: {
        nickname: plan.nickname || undefined,
        amount: plan.amount ? plan.amount / 100 : 0,
        currency: plan.currency,
        interval: plan.interval,
        intervalCount: plan.interval_count,
      },
    });
    console.log(`Plano atualizado com sucesso: ${updatedPlan.stripeId}`);
    return updatedPlan;
  } catch (error) {
    console.error(`Erro ao atualizar plano ${plan.id}:`, error);
    throw error;
  }
}

export async function deletePlan(plan: Stripe.Plan) {
  try {
    const deletedPlan = await prisma.plan.update({
      where: { stripeId: plan.id },
      data: { active: false },
    });
    console.log(`Plano marcado como inativo: ${deletedPlan.stripeId}`);
    return deletedPlan;
  } catch (error) {
    console.error(`Erro ao marcar plano como inativo ${plan.id}:`, error);
    throw error;
  }
}
