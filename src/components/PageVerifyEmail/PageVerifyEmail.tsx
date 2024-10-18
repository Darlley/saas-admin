'use client';

import { verifyEmail } from '@/actions/verify-email';
import { Button } from '@/components/ui/button';
import Logotipo from '@/icons/Logotipo';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ApiResponse } from '../../../types/api-response.types';
import { PageVerifyEmailProps } from './PageVerifyEmail.types';

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

export default function PageVerifyEmail(props: PageVerifyEmailProps) {
  const { token } = props;

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = useCallback(async (token: string) => {
    try {
      const response: ApiResponse = await verifyEmail(token);
      if (response.type === 'success') {
        setSuccess(response?.message || '');
      } else {
        setError(response?.message || '');
      }
    } catch (error: any) {
      setError(error?.message || '');
    }
  }, []);

  useEffect(() => {
    if (token) {
      onSubmit(token);
    }
  }, [token, onSubmit]);

  const renderContent = () => {
    if (error) {
      return (
        <>
          <h1 className="mt-2 text-lg font-semibold text-gray-950">
            Ocorreu um erro ao verificar seu e-mail
          </h1>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
              className="my-4 flex items-center gap-2 p-3 rounded-md bg-red-100 text-red-600 text-sm"
            >
              <span>⚠️</span>
              <span>{error}</span>
            </motion.div>
          </AnimatePresence>
          <p className="mt-2 text-sm text-gray-500">
            Por favor, tente novamente ou entre em contato com o suporte pelo
            email {SUPPORT_EMAIL}.
          </p>
          <div className="mt-6 flex gap-2">
            <Button asChild>
              <Link href="/login">Fazer login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Criar conta</Link>
            </Button>
          </div>
        </>
      );
    }

    if (success)
      <>
        <h1 className="mt-2 text-lg font-semibold text-gray-950">
          E-mail Verificado com Sucesso!
        </h1>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
            className="flex items-center gap-2 p-3 rounded-md bg-green-100 text-green-600 text-sm"
          >
            <span>✅</span>
            <span>{success}</span>
          </motion.div>
        </AnimatePresence>
        <p className="mt-2 text-sm text-gray-500">
          Sua conta foi ativada. Você agora pode fazer login.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/login">Ir para o Login</Link>
          </Button>
        </div>
      </>;

    return (
      <>
        <h1 className="mt-2 text-lg font-semibold text-gray-950">
          Verificando seu e-mail...
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Por favor, aguarde enquanto processamos sua solicitação.
        </p>
      </>
    );
  };

  return (
    <main className="py-4 h-full">
      <div className="mx-auto w-full h-full max-w-md md:w-96 md:max-w-sm flex flex-col justify-center">
        <header>
          <Link href="/" aria-label="Home">
            <Logotipo className="h-10 w-auto animate-pulse" />
          </Link>
          {renderContent()}
        </header>
      </div>
    </main>
  );
}
