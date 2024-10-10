import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ClientNavigation from '@/constants/client-navigation';
import Logotipo from '@/icons/Logotipo';
import { Menu } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'INICIO | Micro-SaaS Name',
    template: '%s | Micro-SaaS Name',
  },
  description: 'Micro-SaaS Description',
  openGraph: {
    title: 'Micro-SaaS Name',
    description: 'Micro-SaaS Description',
    url: 'https://microsaas.com.br/',
    siteName: 'Micro-SaaS Name',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} relative`}>
        <div className="w-full fixed top-0 bg-white/20 backdrop-blur-md z-50">
          <nav className="px-4 2xl:px-0 py-4 container mx-auto flex w-full justify-between">
            <div className="flex items-center md:gap-x-12">
              <Link href="#" aria-label="Home">
                <Logotipo className="h-10 w-auto" />
              </Link>
              <div className="hidden md:flex md:gap-x-6">
                {ClientNavigation.map((item, index) => (
                  <Link
                    key={`ClientNavigationDesktop-${index}`}
                    href={item.path}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <div className="hidden md:block">
                <Link href="/login">Entrar</Link>
              </div>
              <Button asChild>
                <Link href="#pricing">
                  <span>
                    Começar <span className="hidden lg:inline">agora</span>
                  </span>
                </Link>
              </Button>
              <div className="-mr-1 md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col">
                    <nav className="flex flex-col gap-2 items-start px-2 text-sm font-medium lg:px-4">
                      <Link href="/" aria-label="Home">
                        <Logotipo className="size-8" />
                      </Link>
                      {ClientNavigation.map((item, index) => (
                        <Link
                          key={`ClientNavigationMobile-${index}`}
                          href={item.path}
                          className="flex items-center gap-2 text-lg font-semibold"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto">
                      <Card>
                        <CardHeader>
                          <CardTitle>Upgrade to Pro</CardTitle>
                          <CardDescription>
                            Unlock all features and get unlimited access to our
                            support team.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button size="sm" className="w-full">
                            Upgrade
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>
        </div>

        {children}
      </body>
    </html>
  );
}
