'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, LoaderCircleIcon } from 'lucide-react';
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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ApiResponse } from '../../../types/api-response.types';
import { Separator } from '../ui/separator';
import { RegisterSchema, registerSchema } from './SignupForm.schemas';
import { SignupFormProps } from './SignupForm.types';
import { useRouter } from 'next/navigation';
export default function SignupForm(props: SignupFormProps) {
  const router = useRouter()
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
        router.replace('/login')
      }, 1000)
    } else {
      toast.error(data.message);
      setError(data?.message ?? '');
    }
  }

  return (
    <div className="w-full mt-6">
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
                {errors.email ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    <span
                      className={`flex items-center gap-2 text-xs ${
                        isValidPassword.minLength
                          ? 'text-teal-500'
                          : 'text-destructive'
                      }`}
                    >
                      <Check className="size-4 stroke-1" />
                      <span>Pelo menos 8 caracteres</span>
                    </span>
                    <span
                      className={`flex items-center gap-2 text-xs ${
                        isValidPassword.hasLowercase
                          ? 'text-teal-500'
                          : 'text-destructive'
                      }`}
                    >
                      <Check className="size-4 stroke-1" />
                      <span>Uma letra minúscula</span>
                    </span>
                    <span
                      className={`flex items-center gap-2 text-xs ${
                        isValidPassword.hasUppercase
                          ? 'text-teal-500'
                          : 'text-destructive'
                      }`}
                    >
                      <Check className="size-4 stroke-1" />
                      <span>Uma letra maiúscula</span>
                    </span>
                    <span
                      className={`flex items-center gap-2 text-xs ${
                        isValidPassword.hasNumber
                          ? 'text-teal-500'
                          : 'text-destructive'
                      }`}
                    >
                      <Check className="size-4 stroke-1" />
                      <span>Um número</span>
                    </span>
                    <span
                      className={`flex items-center gap-2 text-xs ${
                        isValidPassword.hasSpecialChar
                          ? 'text-teal-500'
                          : 'text-destructive'
                      }`}
                    >
                      <Check className="size-4 stroke-1" />
                      <span>Um caractere especial</span>
                    </span>
                  </FormDescription>
                )}
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

      <div className="flex box-content my-6 items-center w-full justify-center gap-4">
        <Separator className="max-w-20" />
        <span>ou</span>
        <Separator className="max-w-20" />
      </div>

      <div className="flex gap-2 justify-center w-full">
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => signIn('github')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            viewBox="0 0 20 20"
          >
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g fill="currentColor" transform="translate(-140 -7559)">
                <g transform="translate(56 160)">
                  <path d="M94 7399c5.523 0 10 4.59 10 10.253 0 4.529-2.862 8.371-6.833 9.728-.507.101-.687-.219-.687-.492 0-.338.012-1.442.012-2.814 0-.956-.32-1.58-.679-1.898 2.227-.254 4.567-1.121 4.567-5.059 0-1.12-.388-2.034-1.03-2.752.104-.259.447-1.302-.098-2.714 0 0-.838-.275-2.747 1.051a9.396 9.396 0 00-2.505-.345 9.375 9.375 0 00-2.503.345c-1.911-1.326-2.751-1.051-2.751-1.051-.543 1.412-.2 2.455-.097 2.714-.639.718-1.03 1.632-1.03 2.752 0 3.928 2.335 4.808 4.556 5.067-.286.256-.545.708-.635 1.371-.57.262-2.018.715-2.91-.852 0 0-.529-.985-1.533-1.057 0 0-.975-.013-.068.623 0 0 .655.315 1.11 1.5 0 0 .587 1.83 3.369 1.21.005.857.014 1.665.014 1.909 0 .271-.184.588-.683.493-3.974-1.355-6.839-5.199-6.839-9.729 0-5.663 4.478-10.253 10-10.253"></path>
                </g>
              </g>
            </g>
          </svg>
        </Button>
        <Button size="lg" className="w-full" variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="-0.5 0 48 48"
          >
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g transform="translate(-401 -860)">
                <g transform="translate(401 860)">
                  <path
                    fill="#FBBC05"
                    d="M9.827 24c0-1.524.253-2.986.705-4.356l-7.909-6.04A23.456 23.456 0 00.213 24c0 3.737.868 7.26 2.407 10.388l7.905-6.05A13.885 13.885 0 019.827 24"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094L39.202 6.4C35.036 2.773 29.695.533 23.714.533a23.43 23.43 0 00-21.09 13.071l7.908 6.04a13.849 13.849 0 0113.182-9.51"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M23.714 37.867a13.849 13.849 0 01-13.182-9.51l-7.909 6.038a23.43 23.43 0 0021.09 13.072c5.732 0 11.205-2.036 15.312-5.849l-7.507-5.804c-2.118 1.335-4.786 2.053-7.804 2.053"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714V28.8h12.604c-.63 3.091-2.346 5.468-4.8 7.014l7.507 5.804c4.314-4.004 7.12-9.969 7.12-17.618"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => signIn('linkedin')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 fill-white"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              fill="#0A66C2"
              d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
            ></path>
          </svg>
        </Button>
      </div>
    </div>
  );
}
