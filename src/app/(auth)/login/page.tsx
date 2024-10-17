import SigninForm from '@/components/SigninForm';
import Logotipo from '@/icons/Logotipo';
import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Login() {
  return (
    <main className="py-4 h-full">
      <div className="mx-auto w-full h-full max-w-md md:w-96 md:max-w-sm flex flex-col justify-center">
        <header>
          <Link href="/" aria-label="Home">
            <Logotipo className="h-10 w-auto" />
          </Link>
          <h1 className="mt-2 text-lg font-semibold text-gray-950">
            Bem vindo de volta
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Não tem uma conta?{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Crie uma
            </Link>
          </p>
        </header>
        <SigninForm />
      </div>
    </main>
  );
}
