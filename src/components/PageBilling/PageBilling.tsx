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

import PricingList from '../PricingList';
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
import { PageBillingProps } from './PageBilling.types';
export default function PageBilling(props: PageBillingProps) {
  // const {} = props
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
              Atualmente você está no plano <strong>Free</strong>. O próximo
              pagamento será em 10/10/2024.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <header className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">20/100</span>
                <span className="text-muted-foreground text-sm">20%</span>
              </header>
              <main>
                <Progress value={20} />
              </main>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <p>Para aumentar o limite, atualize seu plano.</p>
              <Button>Atualizar plano</Button>
            </div>
            <Separator />
            <div className="w-full">
              <PricingList readonly />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
