import NewPasswordForm from '@/components/NewPasswordForm';
import Logotipo from '@/icons/Logotipo';
import Link from 'next/link';

import { PageNewPasswordProps } from './PageNewPassword.types';
import { Button } from '../ui/button';
export default function PageNewPassword(props: PageNewPasswordProps) {
  const { token } = props;

  return (
    <main className="py-4 h-full">
      <div className="mx-auto w-full h-full max-w-md md:w-96 md:max-w-sm flex flex-col justify-center">
        {token ? (
          <>
            <header>
              <Link href="/" aria-label="Home">
                <Logotipo className="h-10 w-auto" />
              </Link>
              <h1 className="mt-2 text-lg font-semibold text-gray-950">
                Crie uma nova senha
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Não quer criar nova senha?{' '}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Faça login
                </Link>{' '}
                em sua conta
              </p>
            </header>
            <NewPasswordForm token={token} />
          </>
        ) : (
          <>
            <header>
              <Link href="/" aria-label="Home">
                <Logotipo className="h-10 w-auto" />
              </Link>
              <h1 className="mt-2 text-lg font-semibold text-gray-950">
                Não foi possível processar sua solicitação...
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Por favor, forneça um token válido para criar uma nova senha.
              </p>
            </header>

            <div className="mt-4 flex gap-4">
              <Button asChild>
                <Link href="/login">Voltar para login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Criar nova conta</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
