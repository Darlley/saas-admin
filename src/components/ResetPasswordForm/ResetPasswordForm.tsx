'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Ellipsis } from 'lucide-react';
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
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { resetPassword } from '@/actions/reset-password';
import { resetSchema, ResetSchema } from './ResetPasswordForm.schemas';
import { toast } from 'sonner';

const EMAIL_FROM = process.env.NEXT_PUBLIC_EMAIL_FROM!;
const RESEND_KEY = process.env.NEXT_PUBLIC_AUTH_RESEND_KEY!;

import { ResetPasswordFormProps } from './ResetPasswordForm.types';
export default function ResetPasswordForm(props: ResetPasswordFormProps) {
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
  const { watch } = form;

  async function handleSubmit(values: ResetSchema) {
    setSuccess(null);
    setError(null);

    const result = await resetPassword(values);

    if (result.type === 'error') {
      setError(result.message);
    } else {
      setSuccess(result.message);
      if (RESEND_KEY && watch('email').endsWith('@gmail.com')) {
        const from = EMAIL_FROM?.replace("@", "%40")
        const subject = encodeURIComponent("Redefinição de senha");
        
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
