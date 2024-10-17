import Logotipo from '@/icons/Logotipo';
import Link from 'next/link';

import ResetPasswordForm from '@/components/ResetPasswordForm';

export default function page() {
  return (
    <main className="py-4 h-full">
      <div className="mx-auto w-full h-full max-w-md md:w-96 md:max-w-sm flex flex-col justify-center">
        <header>
          <Link href="/" aria-label="Home">
            <Logotipo className="h-10 w-auto" />
          </Link>
          <h1 className="mt-2 text-lg font-semibold text-gray-950">
            Comece agora
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Ja tem uma conta?{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Faça login
            </Link>{' '}
            em sua conta
          </p>
        </header>
        <ResetPasswordForm />
      </div>
    </main>
  );
}
