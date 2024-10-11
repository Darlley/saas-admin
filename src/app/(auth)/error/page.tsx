import { Button } from '@/components/ui/button';
import Logotipo from '@/icons/Logotipo';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logotipo className="h-10 w-auto" />
        </Link>
      </div>
      <h1 className="mt-2 text-lg font-semibold text-gray-900">
        Parece que algo deu errado
      </h1>
      <p className="my-2 text-sm text-gray-700">
        vamos tentar novamente?
      </p>
      <Button asChild>
        <Link href="/login">
          Entrar
        </Link>
      </Button>
    </main>
  );
}
