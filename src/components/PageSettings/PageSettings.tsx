import { PageSettingsProps } from './PageSettings.types';

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
import UserUpdateForm from '../UserUpdateForm/UserUpdateForm';

export default function PageSettings(props: PageSettingsProps) {
  const { session } = props;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Configurações</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="space-y-6 p-4">
        <div>
          <h1 className="text-xl font-medium">Perfil do usuário</h1>
          <p className="text-sm text-muted-foreground">
            Atualize suas informações pessoais e gerencie as configurações da sua conta.
          </p>
        </div>
        <Separator />
        <UserUpdateForm session={session} />
      </div>
    </div>
  );
}
