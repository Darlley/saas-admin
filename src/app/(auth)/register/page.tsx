import Logotipo from '@/icons/Logotipo';
import { type Metadata } from 'next';
import Link from 'next/link';

import SignupForm from '@/components/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function Register() {
  return (
    <main className="mx-auto w-full max-w-md md:w-96 md:max-w-sm md:px-0 py-4">
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logotipo className="h-10 w-auto" />
        </Link>
      </div>
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
      <SignupForm />
    </main>
  );
}
