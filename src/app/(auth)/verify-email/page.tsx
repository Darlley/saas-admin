'use client';

import { Button } from '@/components/ui/button';
import Logotipo from '@/icons/Logotipo';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState<
    'loading' | 'success' | 'error'
  >('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const renderContent = () => {
    if (verificationStatus === 'loading') {
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
    }

    if (verificationStatus === 'error') {
      return (
        <>
          <h1 className="mt-2 text-lg font-semibold text-gray-950">
            Ocorreu um erro ao verificar seu e-mail
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {message}
            <br />
            Por favor, tente novamente ou entre em contato com o suporte.
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

    return (
      <>
        <h1 className="mt-2 text-lg font-semibold text-gray-950">
          E-mail Verificado com Sucesso!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Sua conta foi ativada. Você agora pode fazer login.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/login">Ir para o Login</Link>
          </Button>
        </div>
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
