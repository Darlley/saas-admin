'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Ellipsis, X } from 'lucide-react';
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
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ApiResponse } from '../../../types/api-response.types';
import { RegisterSchema, registerSchema } from './SignupForm.schemas';
import { SignupFormProps } from './SignupForm.types';

const EMAIL_FROM = process.env.NEXT_PUBLIC_EMAIL_FROM!;
const RESEND_KEY = process.env.NEXT_PUBLIC_AUTH_RESEND_KEY!;

export default function SignupForm({ prefilledEmail = '' }: SignupFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: prefilledEmail,
      password: '',
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
      setSuccess(data?.message ?? '');
      if (RESEND_KEY && watch('email').endsWith('@gmail.com')) {
        const from = EMAIL_FROM?.replace('@', '%40');
        const subject = encodeURIComponent('Confirme seu e-mail');

        toast.success('Você usa o Gmail?', {
          action: {
            label: 'Abra aqui',
            onClick: () =>
              window.open(
                `https://mail.google.com/mail/u/0/?hl=pt-BR#advanced-search/from=${from}&subject=${subject}`,
                '_blank'
              ),
          },
        });
      }
    } else {
      setError(data?.message ?? '');
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
                    disabled={!!prefilledEmail}
                  />
                </FormControl>
                {prefilledEmail && (
                  <FormDescription>
                    Use o mesmo email fornecido durante o checkout.
                  </FormDescription>
                )}
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
                        ? 'text-green-500'
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
                        ? 'text-green-500'
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
                        ? 'text-green-500'
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
                        ? 'text-green-500'
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
                        ? 'text-green-500'
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

          <div className="flex flex-col mb-2">
            <Button size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <Ellipsis className="size-8 stroke-2 animate-pulse ml-2.5" />
              ) : (
                <>Cadastrar</>
              )}
            </Button>
            {/* <Button size="lg" disabled={isSubmitting} variant="link">
              Enviar link mágico
            </Button> */}
          </div>
        </form>
      </Form>

      <div className="flex gap-2 justify-center w-full mt-2">
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
