import ClientNavigation from '@/constants/client-navigation';
import { plans } from '@/constants/plans';
import Logotipo from '@/icons/Logotipo';
import { cn } from '@/lib/utils';
import { CheckCircle, Menu } from 'lucide-react';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

import ThemeToggle from '../ThemeToggle';
import { PageHomeProps } from './PageHome.types';
import PricingList from '../PricingList';
export default function PageHome(props: PageHomeProps) {
  return (
    <>
      <div className="w-full fixed top-0 bg-white/20 dark:bg-secondary/20 backdrop-blur-md z-50">
        <nav className="px-4 2xl:px-0 py-4 container mx-auto flex w-full justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Logotipo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              {ClientNavigation.map((item, index) => (
                <Link key={`ClientNavigationDesktop-${index}`} href={item.path}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <Link href="/login">Entrar</Link>
            </div>
            <Button asChild className="hidden md:block">
              <Link href="/register">
                <span>Criar conta</span>
              </Link>
            </Button>
            <ThemeToggle />
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
                    <Link href="/" aria-label="Home" className="mb-4">
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
                    <div className='mb-4'>
                      <Link href="/login">Entrar</Link>
                    </div>
                    <Button asChild>
                      <Link href="/register">
                        <span>Criar conta</span>
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>

      <header className="h-svh py-6 mx-auto container flex-1 flex-grow flex flex-col text-center items-center justify-center">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 dark:text-secondary-foreground sm:text-7xl">
          Faça uma frase de efeito{' '}
          <span className="relative whitespace-nowrap text-primary">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/20"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">impactante</span>
          </span>{' '}
          na sua headline
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-secondary-foreground dark:text-secondary-foreground">
          Descreva seu modelo de negócio, qual dor do cliente seu micro-saas
          pode ajudar a solucionar?
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button asChild>
            <Link href="/register">Começar agora</Link>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <svg
                  aria-hidden="true"
                  className="h-3 w-3 flex-none fill-primary group-active:fill-current"
                >
                  <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
                </svg>
                <span className="ml-2.5">Assistir demonstração</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 lg:w-8/12 h-max max-w-full !rounded-none p-0 border-none">
              <DialogHeader className="p-2 text-sm">
                <DialogTitle>Demonstração</DialogTitle>
                <DialogDescription>Descrição do video</DialogDescription>
              </DialogHeader>
              <iframe
                src="https://www.youtube.com/embed/QXo-Kng7pZQ?autoplay=1&controls=0&quality=hd1080"
                title="Demonstração"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full aspect-video rounded-none"
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="">
        <section id="resources" className="py-24 h-full w-full">
          <div className="container mx-auto">Recursos</div>
        </section>

        <section id="testimonials" className="py-24 h-full w-full">
          <div className="container mx-auto">Testemunhos</div>
        </section>

        <section
          id="pricing"
          className="bg-secondary/20 dark:bg-none py-24 h-full w-full border-b dark:border-secondary-foreground/20"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)]"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl md:text-4xl font-bold">
              Cresça seu negócio <br />
              com o <span className="text-primary">melhor investimento!</span>
            </h2>
          </div>

          <div className="container mx-auto mt-12 md:mt-16 px-4 2xl:px-0">
            <PricingList />
          </div>
        </section>

        <section id="questions" className="py-32">
          <div className="container mx-auto grid grid-cols-12 px-4 2xl:px-0">
            <div className="col-span-12 md:col-span-4">
              <h2 className="text-5xl font-bold">
                Dúvidas
                <br className="sr-only" />
                frequentes
              </h2>
            </div>

            <div className="col-span-12 md:col-span-8">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-xl text-primary">
                    Posso solicitar a devolução do meu pagamento?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-lg">
                    Sim, você pode solicitar a devolução dentro de 30 dias após
                    a compra. Para isso, entre em contato com nosso suporte e
                    forneça seu motivo. A equipe irá analisar seu pedido e, se
                    aprovado, o valor será creditado de volta na forma de
                    pagamento original.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-xl text-primary">
                    Como faço para criar uma conta no Bling?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-lg">
                    Para criar uma conta, acesse nossa página de cadastro e
                    preencha o formulário com seus dados pessoais e informações
                    da sua empresa. Após enviar, você receberá um e-mail de
                    confirmação. Clique no link no e-mail e sua conta será
                    ativada!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-xl text-primary">
                    Como posso cancelar minha assinatura?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-lg">
                    Você pode cancelar sua assinatura diretamente em sua conta,
                    na seção de configurações de pagamento. Se precisar de
                    assistência, entre em contato com nosso suporte e teremos
                    prazer em ajudar.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-xl text-primary">
                    Como posso mudar meu plano para um mais avançado?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-lg">
                    Para mudar seu plano, acesse a área de configurações dentro
                    de sua conta. Escolha o novo plano desejado e siga as
                    instruções para concluir a atualização. O valor proporcional
                    ao novo plano será cobrado na próxima fatura.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-xl text-primary">
                    Esqueci minha senha. Como posso recuperá-la?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-lg">
                    Se você esqueceu sua senha, clique em &quot;Esqueci minha
                    senha&ldquo; na página de login. Você receberá um e-mail com
                    instruções para redefinir sua senha. Siga as etapas para
                    criar uma nova senha e acessar sua conta novamente.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-secondary border-t border-slate-400/10">
        <div className="container mx-auto">
          <div className="flex flex-col items-center  py-10 sm:flex-row-reverse sm:justify-between">
            <div className="flex flex-col md:flex-row-reverse items-center gap-y-4 md:gap-x-6">

              <div className='flex items-center gap-4'>
                <Link href="#" className="group" aria-label="TaxPal on X">
                  <svg className="size-6 dark:stroke-secondary-foreground" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
                  </svg>
                </Link>
                <Link href="#" className="group" aria-label="TaxPal on GitHub">
                  <svg className="size-6 dark:fill-secondary-foreground" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                  </svg>
                </Link>
              </div>
              <p>
                Desenvolvido por{' '}
                <Link
                  href="https://darlley.dev"
                  className="text-primary font-bold"
                >
                  Qual seu nome?
                </Link>
              </p>
            </div>
            <p className="text-sm mt-2">
              &copy; {new Date().getFullYear()} Microo-SaaS. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
