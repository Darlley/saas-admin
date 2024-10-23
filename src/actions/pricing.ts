'use server'

import { prisma } from "@/services/database"

export async function getProductsWithPrices() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      include: {
        prices: {
          where: { active: true },
          orderBy: { amount: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    })

    return products
  } catch (error) {
    console.error('Erro ao buscar produtos com preços:', error)
    throw new Error('Falha ao carregar os produtos')
  }
}

export async function getProductsWithPlans() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      include: {
        plans: {
          where: { active: true },
          orderBy: { amount: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    })

    return products
  } catch (error) {
    console.error('Erro ao buscar produtos com planos:', error)
    throw new Error('Falha ao carregar os produtos')
  }
}