import Logotipo from '@/icons/Logotipo';
import { type Metadata } from 'next';
import Link from 'next/link';
import SignupForm from '@/components/SignupForm';
import { stripe } from '@/services/stripe';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default async function Register({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let email = '';

  if (searchParams.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(searchParams.session_id as string);
      email = session?.customer_details?.email || '';
    } catch (error) {
      console.error('Erro ao recuperar detalhes da sessão:', error);
    }
  }

  return (
    <main className="py-4 h-full">
      <div className="mx-auto w-full h-full max-w-md md:w-96 md:max-w-sm flex flex-col justify-center">
        <header>
          <Link href="/" aria-label="Home">
            <Logotipo className="h-10 w-auto" />
          </Link>
          <h1 className="mt-2 text-lg font-semibold text-gray-950 dark:text-secondary-foreground">
            Comece agora
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-secondary-foreground">
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
        <SignupForm prefilledEmail={email} />
      </div>
    </main>
  );
}
