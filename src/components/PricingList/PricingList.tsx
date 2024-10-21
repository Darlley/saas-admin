'use client';

import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getProductsWithPlans } from '@/actions/pricing';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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
  marketing_features?: string[];
  plans: Plan[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  stripeId: string;
}

interface Plan {
  id: string;
  stripeId: string;
  productId: string;
  nickname: string | null;
  amount: number;
  currency: string;
  interval:
    | 'day'
    | 'week'
    | 'month'
    | 'quarter'
    | 'semester'
    | 'year'
    | 'custom';
  intervalCount: number;
  active: boolean;
}

export default function PricingList() {
  const { data: session } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [intervalOptions, setIntervalOptions] = useState<
    Array<{ interval: string; intervalCount: number }>
  >([]);
  const [selectedInterval, setSelectedInterval] = useState<string>('');

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProductsWithPlans();
      setProducts(fetchedProducts as Product[]);

      const uniqueIntervalOptions = Array.from(
        new Set(
          fetchedProducts.flatMap((product) =>
            product.plans.map(
              (plan) => `${plan.interval}-${plan.intervalCount}`
            )
          )
        )
      )
        .map((option) => {
          const [interval, intervalCount] = option.split('-');
          return { interval, intervalCount: parseInt(intervalCount) };
        })
        .sort((a, b) => {
          const order = ['day', 'week', 'month', 'quarter', 'semester', 'year'];
          const intervalDiff =
            order.indexOf(a.interval) - order.indexOf(b.interval);
          return intervalDiff !== 0
            ? intervalDiff
            : a.intervalCount - b.intervalCount;
        });

      setIntervalOptions(uniqueIntervalOptions);
      setSelectedInterval(
        `${uniqueIntervalOptions[0]?.interval}-${uniqueIntervalOptions[0]?.intervalCount}` ||
          ''
      );
    }

    fetchProducts();
  }, []);

  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      if (response.status === 401) {
        // Usuário não está autenticado, redirecionar para login
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resposta do servidor:', errorText);
        throw new Error(
          `Falha ao iniciar o checkout: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (data.url) {
        router.push(data.url);
      } else {
        throw new Error('URL de checkout não encontrada na resposta');
      }
    } catch (error) {
      console.error('Erro ao processar a assinatura:', error);
      toast.error('Falha ao iniciar o checkout. Por favor, tente novamente.');
    }
  };

  return (
    <Tabs
      value={selectedInterval}
      onValueChange={setSelectedInterval}
      className="flex flex-col gap-10"
    >
      <TabsList className="mx-auto">
        {intervalOptions?.length > 0 ? (
          intervalOptions?.map(({ interval, intervalCount }) => (
            <TabsTrigger
              key={`${interval}-${intervalCount}`}
              value={`${interval}-${intervalCount}`}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {translateInterval(interval, intervalCount)}
            </TabsTrigger>
          ))
        ) : (
          <TabsTrigger
            value="default"
            disabled
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Ative o Webhook e crie os planos no Stripe
          </TabsTrigger>
        )}
      </TabsList>
      {intervalOptions.map(({ interval, intervalCount }) => (
        <TabsContent
          key={`${interval}-${intervalCount}`}
          value={`${interval}-${intervalCount}`}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
            {products.map((product) => {
              const plans = product.plans.filter(
                (p) =>
                  p.interval === interval &&
                  p.intervalCount === intervalCount &&
                  p.active
              );
              if (plans.length === 0) return null;

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
                      <span className="text-primary">{product.name}</span>
                      {product.popular && (
                        <Badge className="animate-pulse">Popular</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    {plans.map((plan) => (
                      <div key={plan.id} className="mt-2">
                        <div>
                          {session ? (
                            <span className="text-3xl font-semibold">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: plan.currency,
                              }).format(plan.amount)}
                            </span>
                          ) : (
                            <span className="text-3xl font-semibold blur-md">
                              R$ --,--
                            </span>
                          )}
                          <sub>
                            /
                            {translateInterval(
                              plan.interval,
                              plan.intervalCount
                            )}
                          </sub>
                        </div>
                        {session ? (
                          plan.amount === 0 ? (
                            <Button
                              className="w-full mt-2"
                              variant="outline"
                              asChild
                            >
                              <Link href="/dashboard">Começar agora</Link>
                            </Button>
                          ) : (
                            <Button
                              className="w-full mt-2"
                              onClick={() => handleSubscribe(plan.stripeId)}
                            >
                              Assinar {plan.nickname || ''}
                            </Button>
                          )
                        ) : (
                          <Button
                            className="w-full mt-2"
                            onClick={() => router.push('/login')}
                          >
                            Fazer login para ver preços
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardHeader>
                  <CardContent className="border-t pt-4">
                    <ul className="space-y-2">
                      {product?.marketing_features?.map((feature) => (
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

function translateInterval(
  interval: string,
  intervalCount: number = 1
): string {
  const translations: Record<
    string,
    { exato: string; singular: string; plural: string }
  > = {
    day: { exato: 'dia', singular: 'diário', plural: 'diários' },
    week: { exato: 'semana', singular: 'semanal', plural: 'semanais' },
    month: { exato: 'mês', singular: 'mensal', plural: 'mensais' },
    quarter: {
      exato: 'trimestre',
      singular: 'trimestral',
      plural: 'trimestrais',
    },
    semester: {
      exato: 'semestre',
      singular: 'semestral',
      plural: 'semestrais',
    },
    year: { exato: 'ano', singular: 'anual', plural: 'anuais' },
  };

  const translation = translations[interval] || {
    exato: interval,
    singular: `${interval}al`,
    plural: `${interval}ais`,
  };

  if (intervalCount === 1) {
    return (
      translation.singular.charAt(0).toUpperCase() +
      translation.singular.slice(1)
    );
  } else if (interval === 'month' && intervalCount === 12) {
    return 'Anual';
  } else {
    return `A cada ${intervalCount} ${translation.exato}${
      intervalCount > 1 ? 's' : ''
    }`;
  }
}
