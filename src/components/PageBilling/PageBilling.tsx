import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { getUserWithId } from '@/actions/getUserWithId';
import PricingList from '../PricingList';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { PageBillingProps } from './PageBilling.types';

export default async function PageBilling(props: PageBillingProps) {
  const { session } = props;
  const user = await getUserWithId(session?.user?.id);

  // Extraindo o último subscription em uma variável
  const lastSubscription =
    user?.Subscriptions?.[user?.Subscriptions?.length - 1];

  // Extraindo price e product da última subscription
  const price = lastSubscription?.price;
  const product = price?.product;

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

  // Crie itens nos metadados do preço no Stripe. Adicione "_limit" ao final de cada chave para definir limites de uso.
  // Exemplo: "api_calls_limit": "1000" para limitar chamadas de API a 1000 por período de cobrança.
  const manualLimits: Record<string, { limit: number; title: string }> = {
    create_limit: { limit: 100, title: 'Criação' },
    api_calls_limit: { limit: 100, title: 'Chamadas de API' },
  };

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Configurações</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Tema</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="space-y-6 px-4 pb-4">
        <div>
          <h1 className="text-lg font-medium">Assinatura</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie sua assinatura e informações de pagamento. Visualize seu
            plano atual, histórico de faturas e atualize seus métodos de
            pagamento.
          </p>
        </div>
        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Uso do plano</CardTitle>
            <CardDescription>
              {user?.Subscriptions && user.Subscriptions.length > 0 ? (
                <>
                  Atualmente você está no plano{' '}
                  <strong className="uppercase">
                    {product?.name} (
                    {translations[lastSubscription?.interval ?? '']?.singular})
                  </strong>
                  . O próximo pagamento será em{' '}
                  <span className="text-primary">
                    {lastSubscription?.currentPeriodEnd
                      ? new Intl.DateTimeFormat('pt-BR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }).format(
                          new Date(lastSubscription.currentPeriodEnd * 1000)
                        )
                      : 'data não disponível'}
                  </span>
                  .
                </>
              ) : (
                'Atualmente você não tem nenhuma assinatura ativa'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user?.Subscriptions &&
            user.Subscriptions.length > 0 &&
            price?.metadata &&
            Object.keys(price?.metadata).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(price?.metadata as Record<string, any>).map(
                  ([key, value]) => {
                    if (key in manualLimits) {
                      const currentValue = Number(value);
                      const { limit: limitValue, title } = manualLimits[key];
                      const percentage = Math.round(
                        (currentValue / limitValue) * 100
                      );

                      return (
                        <div key={key} className="space-y-2">
                          <header className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                              {title} - {currentValue}/{limitValue}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              {percentage}%
                            </span>
                          </header>
                          <main>
                            <Progress value={percentage} />
                          </main>
                        </div>
                      );
                    }
                    return null;
                  }
                )}
              </div>
            ) : (
              <div className="h-2 rounded-full w-full bg-destructive" />
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <p>Para aumentar o limite, atualize seu plano.</p>
              <Button>Atualizar plano</Button>
            </div>
            <Separator />
            <div className="w-full flex items-start flex-col gap-2">
              <h2 className="text-lg font-medium">Assinaturas</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Frequência</TableHead>
                    <TableHead>Próxima Fatura</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user?.Subscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell className="uppercase">
                        {subscription?.price?.product?.name}{' '}
                      </TableCell>
                      <TableCell className="uppercase">
                        {translations[subscription?.interval ?? '']?.singular}
                      </TableCell>
                      <TableCell>
                        {subscription.currentPeriodEnd
                          ? `${new Intl.DateTimeFormat('pt-BR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            }).format(
                              new Date(subscription.currentPeriodEnd * 1000)
                            )} - ${new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: subscription.price?.currency || 'BRL',
                            }).format(subscription.price?.amount || 0)}`
                          : 'Não disponível'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            subscription.status === 'active'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {subscription.status === 'active'
                            ? 'Ativa'
                            : 'Cancelada'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planos disponíveis</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <PricingList readonly />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
