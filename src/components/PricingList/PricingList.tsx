'use client';

import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getProductsWithPrices } from '@/actions/pricing';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Product {
  id: string;
  name: string;
  description: string | null;
  popular?: boolean;
  features?: string[];
  prices: Price[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  stripeId: string;
}

interface Price {
  id: number;
  productId: string;
  amount: number;
  interval: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  stripePriceId: string;
  // Remova subscriptionId se não estiver presente nos dados reais
  // subscriptionId: number;
}

export default function PricingList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProductsWithPrices();
      // Filtra os produtos para incluir apenas os dois primeiros preços ativos
      const productsWithTwoPrices = fetchedProducts.map(product => ({
        ...product,
        prices: product.prices.filter(price => price.active).slice(0, 2)
      }));
      setProducts(productsWithTwoPrices);
    }

    fetchProducts();
  }, []);

  return (
    <Tabs defaultValue="first">
      <TabsList className="grid w-full max-w-xs sm:max-w-md grid-cols-2 mx-auto mb-8 bg-primary-foreground">
        <TabsTrigger
          value="first"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Mensal
        </TabsTrigger>
        <TabsTrigger
          value="second"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Anual
        </TabsTrigger>
      </TabsList>
      {['first', 'second'].map((tabValue, index) => (
        <TabsContent key={tabValue} value={tabValue} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
            {products.map((product) => {
              const price = product.prices[index];
              if (!price) return null;

              return (
                <Card
                  key={product.id}
                  className={cn(
                    product.popular && 'border-primary',
                    'w-full max-w-sm flex flex-col'
                  )}
                >
                  <CardHeader className="flex flex-col gap-4">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-primary">{product.name} #{price.id}</span>
                      {product.popular && (
                        <Badge className="animate-pulse">Popular</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <div>
                      <span className="text-5xl font-semibold">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(price.amount)}
                      </span>
                      <sub>/{price.interval === 'month' ? 'mês' : 'ano'}</sub>
                    </div>
                    {product.name === 'Free' ? (
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/dashboard">Começar agora</Link>
                      </Button>
                    ) : (
                      <Button className="w-full">Assinar</Button>
                    )}
                  </CardHeader>
                  <CardContent className="border-t pt-4">
                    <ul className="space-y-2">
                      {product.features?.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-x-3 text-sm"
                        >
                          <CheckCircle className="size-5 stroke-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
