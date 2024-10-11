'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, LoaderCircleIcon, X } from 'lucide-react';
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

import { register } from '@/actions/register';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants/public-routes';
import GithubIcon from '@/icons/GithubIcon';
import GoogleIcon from '@/icons/GoogleIcon';
import LinkedinIcon from '@/icons/LinkedinIcon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ApiResponse } from '../../../types/api-response.types';
import { Separator } from '../ui/separator';
import { RegisterSchema, registerSchema } from './SignupForm.schemas';
import { SignupFormProps } from './SignupForm.types';
export default function SignupForm(props: SignupFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: 'Darlley',
      email: 'darlleybrito@gmail.com',
      password: 'mudar1234@L',
    },
    mode: 'onBlur',
  });

  const { errors, isSubmitting } = form.formState;
  const { watch } = form;

  // Valores padrão para as validações
  const [isValidPassword, setIsValidPassword] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Função para validar a senha e atualizar o estado
  const validatePassword = (password: string) => {
    setIsValidPassword({
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[\W_]/.test(password),
    });
  };

  // Observe mudanças na senha
  useEffect(() => {
    const subscription = watch((value) => {
      validatePassword(value?.password ?? '');
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  async function handleSubmit(values: RegisterSchema) {
    setSuccess(null);
    setError(null);

    const data: ApiResponse = await register(values);

    if (data.type === 'success') {
      toast.success(data.message);
      setSuccess(data?.message ?? '');
      setTimeout(() => {
        router.replace('/login');
      }, 1000);
    } else {
      toast.error(data.message);
      setError(data?.message ?? '');
    }
  }

  return (
    <div className="w-full mt-4">
      {success && (
        <div className="flex items-center gap-2 p-2 rounded-sm bg-green-100 text-green-600 mb-4 text-sm">
          <span>✅</span>
          <span className="font-medium">{success}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-2 rounded-sm bg-red-100 text-red-600 mb-4 text-sm">
          <span>⚠️</span>
          <span className="font-medium">{error}</span>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira seu nome"
                    type="text"
                    className="p-4 h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormDescription>
                  <span
                    className={`flex items-center gap-2 text-xs ${
                      isValidPassword.minLength
                        ? 'text-teal-500'
                        : 'text-destructive'
                    }`}
                  >
                    {isValidPassword.minLength ? (
                      <Check className="size-4 stroke-1" />
                    ) : (
                      <X className="size-4 stroke-1" />
                    )}
                    <span>Pelo menos 8 caracteres</span>
                  </span>
                  <span
                    className={`flex items-center gap-2 text-xs ${
                      isValidPassword.hasLowercase
                        ? 'text-teal-500'
                        : 'text-destructive'
                    }`}
                  >
                    {isValidPassword.hasLowercase ? (
                      <Check className="size-4 stroke-1" />
                    ) : (
                      <X className="size-4 stroke-1" />
                    )}
                    <span>Uma letra minúscula</span>
                  </span>
                  <span
                    className={`flex items-center gap-2 text-xs ${
                      isValidPassword.hasUppercase
                        ? 'text-teal-500'
                        : 'text-destructive'
                    }`}
                  >
                    {isValidPassword.hasUppercase ? (
                      <Check className="size-4 stroke-1" />
                    ) : (
                      <X className="size-4 stroke-1" />
                    )}
                    <span>Uma letra maiúscula</span>
                  </span>
                  <span
                    className={`flex items-center gap-2 text-xs ${
                      isValidPassword.hasNumber
                        ? 'text-teal-500'
                        : 'text-destructive'
                    }`}
                  >
                    {isValidPassword.hasNumber ? (
                      <Check className="size-4 stroke-1" />
                    ) : (
                      <X className="size-4 stroke-1" />
                    )}
                    <span>Um número</span>
                  </span>
                  <span
                    className={`flex items-center gap-2 text-xs ${
                      isValidPassword.hasSpecialChar
                        ? 'text-teal-500'
                        : 'text-destructive'
                    }`}
                  >
                    {isValidPassword.hasSpecialChar ? (
                      <Check className="size-4 stroke-1" />
                    ) : (
                      <X className="size-4 stroke-1" />
                    )}
                    <span>Um caractere especial</span>
                  </span>
                </FormDescription>
              </FormItem>
            )}
          />

          <Button size="lg" disabled={isSubmitting}>
            Cadastrar
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
