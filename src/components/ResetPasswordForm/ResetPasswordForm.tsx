'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Ellipsis } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { DEFAULT_LOGIN_REDIRECT } from '@/constants/public-routes';
import GithubIcon from '@/icons/GithubIcon';
import GoogleIcon from '@/icons/GoogleIcon';
import LinkedinIcon from '@/icons/LinkedinIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { resetSchema, ResetSchema } from './ResetPasswordForm.schemas';
import { ResetPasswordFormProps } from './ResetPasswordForm.types';
export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ResetSchema>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const { errors, isSubmitting } = form.formState;

  async function handleSubmit(values: ResetSchema) {
    setSuccess(null);
    setError(null);
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
              <>Enviar email de confirmação</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
