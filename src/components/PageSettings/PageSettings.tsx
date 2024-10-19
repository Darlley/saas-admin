'use client';

import { PageSettingsProps } from './PageSettings.types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserUpdateForm from '../UserUpdateForm/UserUpdateForm';
import { Input } from '../ui/input';

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

      <div className="flex-grow p-4 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Editar Perfil</h1>

        <div className="space-y-8">
          {/* Informações Pessoais */}
          <UserUpdateForm />

          {/* Imagem de Perfil */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 pt-6 border-t">
            <div className="w-full lg:w-1/3">
              <h2 className="text-xl font-semibold">Imagem de Perfil</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione ou atualize sua foto de perfil.
              </p>
            </div>
            <div className="w-full lg:w-2/3">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" alt="Preview" />
                  <AvatarFallback>DB</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">Foto atual</h3>
                  <p className="text-sm text-muted-foreground">
                    JPG, GIF ou PNG. Máximo 1MB.
                  </p>
                </div>
              </div>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="url">URL Externa</TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                  <Input id="picture" type="file" className="p-2.5 h-10" />
                </TabsContent>
                <TabsContent value="url">
                  <Input
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="p-4 h-10"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Botão de Salvar */}
          <div className="flex justify-end">
            <Button>Salvar Alterações</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
