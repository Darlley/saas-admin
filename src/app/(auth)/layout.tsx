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
    <div className="relative h-full w-full flex justify-start bg-gradient-radial from-gray-800 to-slate-950">
      <div className="absolute h-full w-full bg-[radial-gradient(#515151_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className='relative w-full lg:w-1/2 xl:w-1/3 h-full flex items-center justify-center bg-white border-r shadow-xl'>
        {children}
      </div>
    </div>
  );
}
