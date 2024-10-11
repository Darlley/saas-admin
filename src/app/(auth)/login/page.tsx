import SigninForm from '@/components/SigninForm';
import Logotipo from '@/icons/Logotipo';
import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Login() {
  return (
    <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logotipo className="h-10 w-auto" />
        </Link>
      </div>
      <h1 className="mt-2 text-lg font-semibold text-gray-900">
        Bem vindo de volta
      </h1>
      <p className="mt-2 text-sm text-gray-700">
        Não tem uma conta?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Crie uma
        </Link>{' '}
        e faça um teste gratuito.
      </p>
      <SigninForm />
    </main>
  );
}
