'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Ellipsis } from 'lucide-react';
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
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ApiResponse } from '../../../types/api-response.types';
import { LoginSchema, loginSchema } from './SigninForm.schemas';
import { SigninFormProps } from './SigninForm.types';

export default function SigninForm(props: SigninFormProps) {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Este email ja esta sendo utilizado por outra conta'
      : '';

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
      setError(data?.message ?? '');
    }
    if (data?.type === 'success') {
      setSuccess(data?.message ?? '');
    }
  }

  return (
    <div className="w-full mt-4">
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

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
                className="flex items-center gap-2 p-3 rounded-md bg-green-100 text-green-600 text-sm"
              >
                <span>✅</span>
                <span>{success}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
                className="flex items-center gap-2 p-3 rounded-md bg-red-100 text-red-600 text-sm"
              >
                <span>⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <Button size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <Ellipsis className="size-8 stroke-2 animate-pulse ml-2.5" />
            ) : (
              <>Entrar</>
            )}
          </Button>
        </form>
      </Form>

      <div className="flex gap-2 justify-center w-full mt-4">
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
