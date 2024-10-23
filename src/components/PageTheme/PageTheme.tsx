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

import AppearanceForm from '../AppearanceForm';
import { PageThemeProps } from './PageTheme.types';
export default function PageTheme(props: PageThemeProps) {
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

      <div className="space-y-6 px-4">
        <div>
          <h3 className="text-lg font-medium">Aparência</h3>
          <p className="text-sm text-muted-foreground">
            Personalize a aparência do aplicativo. Alterne automaticamente entre
            os temas claro, escure ou o mesmo do seu sitema.
          </p>
        </div>
        <Separator />
        <AppearanceForm />
      </div>
    </div>
  );
}
