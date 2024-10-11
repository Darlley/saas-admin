'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { login } from '@/actions/login';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants/public-routes';
import GithubIcon from '@/icons/GithubIcon';
import GoogleIcon from '@/icons/GoogleIcon';
import LinkedinIcon from '@/icons/LinkedinIcon';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { ApiResponse } from '../../../types/api-response.types';
import { Separator } from '../ui/separator';
import { LoginSchema, loginSchema } from './SigninForm.schemas';
import { SigninFormProps } from './SigninForm.types';
export default function SigninForm(props: SigninFormProps) {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Este email ja esta sendo utilizado por outra conta' : '';

  const [error, setError] = useState<string | null>(urlError || null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'darlleybrito@gmail.com',
      password: '',
    },
    mode: 'onBlur',
  });

  const { errors, isSubmitting } = form.formState;

  async function handleSubmit(values: LoginSchema) {
    setSuccess(null);
    setError(null);

    const data: ApiResponse | any = await login(values);

    if (data?.type === 'error') {
      toast.error(data?.message);
      setError(data?.message ?? '');
    }
  }

  return (
    <div className="w-full mt-4">
      {success && (
        <div className="flex items-center gap-2 p-2 rounded-sm bg-green-100 text-green-600 mb-4 text-sm">
          <span>✅</span>
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-2 rounded-sm bg-red-100 text-red-600 mb-4 text-sm">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira seu email"
                    type="email"
                    className="p-4 h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="********"
                    type="password"
                    className="p-4 h-10"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Não se lembra?{' '}
                  <Link
                    href="/recovery"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Recuperar senha
                  </Link>
                  .
                </FormDescription>
              </FormItem>
            )}
          />

          <Button size="lg" disabled={isSubmitting}>
            Entrar
            {isSubmitting && (
              <LoaderCircleIcon className="animate-spin ml-2.5" />
            )}
          </Button>
        </form>
      </Form>

      <div className="flex box-content my-4 items-center w-full justify-center gap-4">
        <Separator className="max-w-20" />
        <span>ou</span>
        <Separator className="max-w-20" />
      </div>

      <div className="flex gap-2 justify-center w-full">
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() =>
            signIn('github', {
              callbackUrl: DEFAULT_LOGIN_REDIRECT,
              redirect: false,
            })
          }
        >
          <GithubIcon className="size-6" />
        </Button>
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() =>
            signIn('google', {
              callbackUrl: DEFAULT_LOGIN_REDIRECT,
            })
          }
        >
          <GoogleIcon className="size-6" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() =>
            signIn('linkedin', {
              callbackUrl: DEFAULT_LOGIN_REDIRECT,
            })
          }
        >
          <LinkedinIcon className="size-6" />
        </Button>
      </div>
    </div>
  );
}
