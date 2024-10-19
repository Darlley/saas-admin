'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { userUpdateSchema, UserUpdateSchema } from './UserUpdateForm.schemas';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { updateUserInfo } from '@/actions/update-user-info';
import { Ellipsis } from 'lucide-react';
import { toast } from 'sonner';
import { ApiResponse } from '../../../types/api-response.types';
import { Separator } from '../ui/separator';
import { UserUpdateFormProps } from './UserUpdateForm.types';

export default function UserUpdateForm(props: UserUpdateFormProps) {
  const { session } = props;

  const form = useForm<UserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: session?.user.name ?? '',
      email: session?.user.email ?? '',
      image: session?.user.image ?? '',
    },
    mode: 'onBlur',
  });

  const { errors, isSubmitting } = form.formState;

  const { watch } = form;

  async function handleSubmit(values: UserUpdateSchema) {
    console.log('handleSubmit', values);
    try {
      const response: ApiResponse = await updateUserInfo(values);

      if (response.type === 'success') {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      toast.error('Ocorreu um erro ao atualizar as informações');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Informações Pessoais */}
        <div className="flex flex-col lg:flex-row items-start gap-6 ">
          <div className="w-full lg:w-1/3">
            <h2 className="text-xl font-semibold">Informações Pessoais</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Atualize suas informações pessoais aqui.
            </p>
          </div>
          <div className="w-full lg:w-2/3 mt-4 lg:mt-0 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Qual seu Nome Completo?</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" className="p-4 h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Qual seu Email?</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="p-4 h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator orientation="horizontal" />

        {/* Imagem de Perfil */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
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
              <TabsList className="grid w-max grid-cols-2">
                <TabsTrigger value="upload">Enviar arquivo</TabsTrigger>
                <TabsTrigger value="url">Enviar link</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <Input id="picture" type="file" className="p-[9px] h-10" />
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Ellipsis className="size-8 stroke-2 animate-pulse ml-2.5" />
            ) : (
              <>Salvar Alterações</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
