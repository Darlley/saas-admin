import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Autenticação | Micro-SaaS Name',
    template: '%s | Micro-SaaS Name',
  },
  description: 'Micro-SaaS Description',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-svh max-h-full overflow-hidden w-full flex justify-start bg-gradient-radial dark:from-gray-800 dark:to-slate-950">
      <div className="w-full h-full max-h-full overflow-y-auto md:w-2/3 lg:w-1/2 bg-white border-r shadow-xl">
        {children}
      </div>
      <div className="relative hidden md:block w-full md:w-1/3 lg:w-1/2 h-full">
        <div className="absolute h-full w-full dark:bg-[radial-gradient(#515151_1px,transparent_1px)] bg-[radial-gradient(#dbdbdb_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
    </div>
  );
}
