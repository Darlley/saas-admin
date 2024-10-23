'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { ChevronRight, Ellipsis, SquareTerminal } from 'lucide-react';

import Logotipo from '@/icons/Logotipo';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import DropdownProfile from '../DropdownProfile';
import { Button } from '../ui/button';

import { createBillingPortalSession } from '@/actions/createBillingPortalSession';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { DashboardPanelProps } from './DashboardPanel.types';

export default function DashboardPanel(props: DashboardPanelProps) {
  const { children } = props;

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePlan = async (userId: string) => {
    setIsLoading(true);
    try {
      const url = await createBillingPortalSession(userId);
      window.location.href = url;
    } catch (error) {
      console.error('Erro ao abrir o portal de faturamento:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar variant="floating" className="dark:border-primary">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-x-2">
                <div>
                  <Logotipo className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin SaaS</span>
                  <span className="truncate text-xs">Boilerplate nextjs</span>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
            <SidebarMenu>
              {/* <SidebarMenuItem>
                <SidebarMenuButton tooltip="Onboarding">
                  <Flame />
                  <span>Onboarding</span>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              <Collapsible
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Configurações">
                      <SquareTerminal />
                      <span>Configurações</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/settings">
                            <span>Usuário</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/settings/theme">
                            <span>Preferências</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/settings/billing">
                            <span>Assinatura</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Atualizar plano</CardTitle>
              <CardDescription>
                Desbloqueie todos os recursos e obtenha acesso ilimitado à nossa
                equipe de suporte.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button
                size="sm"
                className="w-full"
                onClick={() => handleUpdatePlan(session?.user?.id)}
              >
                {isLoading ? (
                  <Ellipsis className="size-8 stroke-2 animate-pulse ml-2.5" />
                ) : (
                  <>Atualizar plano</>
                )}
              </Button>
            </CardContent>
          </Card>

          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownProfile session={session} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
