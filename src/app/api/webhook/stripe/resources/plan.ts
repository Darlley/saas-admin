import { prisma } from "@/services/database";
import Stripe from "stripe";

export async function createPlan(plan: Stripe.Plan) {
  try {
    const createdPlan = await prisma.plan.create({
      data: {
        stripeId: plan.id,
        productId: plan.product as string,
        nickname: plan.nickname || undefined,
        amount: plan.amount ? plan.amount / 100 : 0,
        currency: plan.currency,
        interval: plan.interval,
        intervalCount: plan.interval_count,
        active: true,
      },
    });
    console.log(`Plano criado com sucesso: ${createdPlan.id}`);
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
        productId: plan.product as string,
        nickname: plan.nickname || undefined,
        amount: plan.amount ? plan.amount / 100 : 0,
        currency: plan.currency,
        interval: plan.interval,
        intervalCount: plan.interval_count,
      },
    });
    console.log(`Plano atualizado com sucesso: ${updatedPlan.id}`);
    return updatedPlan;
  } catch (error) {
    console.error(`Erro ao atualizar plano ${plan.id}:`, error);
    throw error;
  }
}

export async function deletePlan(planId: string) {
  try {
    const deletedPlan = await prisma.plan.update({
      where: { stripeId: planId },
      data: { active: false },
    });
    console.log(`Plano marcado como inativo: ${deletedPlan.id}`);
    return deletedPlan;
  } catch (error) {
    console.error(`Erro ao marcar plano como inativo ${planId}:`, error);
    throw error;
  }
}