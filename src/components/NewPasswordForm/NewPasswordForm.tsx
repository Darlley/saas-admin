'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Ellipsis, X } from 'lucide-react';
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

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import {
  newPasswordSchema,
  NewPasswordSchema,
} from './NewPasswordForm.schemas';
import { NewPasswordFormProps } from './NewPasswordForm.types';
import { newPassword } from '@/actions/new-password';
import { ApiResponse } from '../../../types/api-response.types';
import { useRouter } from 'next/navigation';
export default function NewPasswordForm(props: NewPasswordFormProps) {
  const { token } = props;

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const { errors, isSubmitting } = form.formState;
  const { watch } = form;

  async function handleSubmit(values: NewPasswordSchema) {
    setSuccess(null);
    setError(null);

    try {
      const response: ApiResponse = await newPassword(token, values);
      if (response.type === 'success') {
        setSuccess(response?.message || '');
        return router.push('/login');
      } else {
        setError(response?.message || '');
      }
    } catch (error: any) {
      setError(error?.message || '');
    }
  }

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

  return (
    <div className="w-full mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nova Senha</FormLabel>
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="********"
                    type="password"
                    className="p-4 h-10"
                  />
                </FormControl>
                <FormMessage />
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
              <>Confirmar</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
