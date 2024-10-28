import ClientNavigation from '@/constants/client-navigation';
import Logotipo from '@/icons/Logotipo';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { auth } from '@/services/auth';
import PricingList from '../PricingList';
import ThemeToggle from '../ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PageHomeProps } from './PageHome.types';

export default async function PageHome(props: PageHomeProps) {
  const session = await auth();

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
            {session ? (
              <Link href="/dashboard" className="flex items-center gap-x-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name}
                  />
                  <AvatarFallback className="rounded-lg uppercase">
                    {session.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session.user.name}
                  </span>
                  <span className="truncate text-xs">{session.user.email}</span>
                </div>
              </Link>
            ) : (
              <>
                <div className="hidden md:block">
                  <Link href="/login">Entrar</Link>
                </div>
                <Button asChild className="hidden md:block">
                  <Link href="/register">
                    <span>Criar conta</span>
                  </Link>
                </Button>
              </>
            )}
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
                    <div className="mb-4">
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
          Descreva seu modelo de negócio, qual dor do cliente seu SaaS Admin
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
              <DialogHeader className="p-2 text-sm mb-0 pb-0 h-auto">
                <DialogTitle className="px-2">Demonstração</DialogTitle>
              </DialogHeader>
              <video
                src="/preview.mp4"
                title="Demonstração"
                autoPlay
                controls
                className="w-full aspect-video rounded-none"
              ></video>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="">
        <section id="resources" className="py-24 h-full w-full">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-base/7 font-semibold text-primary">
                Recuros poderosos
              </h2>
              <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Os recursos que você mais configura pronto para uso
              </p>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                <div className="relative lg:col-span-3">
                  <div className="absolute inset-px rounded-lg bg-card max-lg:rounded-t-lg lg:rounded-tl-lg" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-lg max-lg:rounded-t-lg lg:rounded-tl-lg">
                    <Carousel className="w-full">
                      <CarouselContent>
                        <CarouselItem>
                          <img
                            alt="Landing Page tema claro sistemas de cores azul"
                            src="/features/landing-page01-light.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Landing Page tema escuro sistemas de cores azul"
                            src="/features/landing-page01-dark.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Landing Page tema claro sistemas de cores vermelho"
                            src="/features/landing-page02-light.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Landing Page tema claro sistemas de cores vermelho"
                            src="/features/landing-page02-dark.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 left-2 text-white" />
                      <CarouselNext className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 right-2 text-white" />
                    </Carousel>
                    <div className="p-4 sm:p-6 md:p-10 md:pt-4">
                      <h3 className="text-xs sm:text-sm font-semibold text-primary">
                        FREE
                      </h3>
                      <p className="mt-1 sm:mt-2 text-base sm:text-lg font-medium tracking-tight text-foreground">
                        Landing Page comercial
                      </p>
                      <p className="mt-1 sm:mt-2 max-w-lg text-xs sm:text-sm text-muted-foreground">
                        Tenha uma landing page linda para vender o seu produto,
                        já configurada com temas claro, escuro ou do próprio
                        sistema. O sistema de cores do projeto inteiro também já
                        está configurado com as próprias classes do{' '}
                        <span className="text-primary">shadcn/ui</span>
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-border max-lg:rounded-t-lg lg:rounded-tl-lg" />
                </div>
                <div className="relative lg:col-span-3">
                  <div className="absolute inset-px rounded-lg bg-card lg:rounded-tr-lg" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-tr-lg">
                    <Carousel className="w-full">
                      <CarouselContent>
                        <CarouselItem>
                          <img
                            alt="Dasboard página de configuração do usuario"
                            src="/features/dashboard01.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Dasboard página de configuração das preferências"
                            src="/features/dashboard02.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Dasboard página de configuração da assinatura"
                            src="/features/dashboard03.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 left-2 text-white" />
                      <CarouselNext className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 right-2 text-white" />
                    </Carousel>
                    <div className="p-4 sm:p-6 md:p-10 md:pt-4">
                      <h3 className="text-xs sm:text-sm font-semibold text-primary">
                        FREE
                      </h3>
                      <p className="mt-1 sm:mt-2 text-base sm:text-lg font-medium tracking-tight text-foreground">
                        Dashboard de administração
                      </p>
                      <p className="mt-1 sm:mt-2 max-w-lg text-xs sm:text-sm text-muted-foreground">
                        Tenha um dashboard onde o cliente pode gerenciar as
                        próprias informações pessoais e de assinatura. Aqui o
                        céu é o limite. Criei um template com o plop.js para
                        criação de componentes: com um simpres comando{' '}
                        <code className="text-primary">pnpm plop</code> você
                        pode criar um novo componente com uma estrutura única e
                        escalável.
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-border lg:rounded-tr-lg" />
                </div>
                <div className="relative lg:col-span-2">
                  <div className="absolute inset-px rounded-lg bg-card lg:rounded-bl-lg" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-bl-lg">
                    <Carousel className="w-full">
                      <CarouselContent>
                        <CarouselItem>
                          <img
                            alt="Autenticação página de login"
                            src="/features/auth01.png"
                            className="h-80 w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Autenticação página de registro"
                            src="/features/auth02.png"
                            className="h-80 w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Autenticação página de recuperação de senha"
                            src="/features/auth03.png"
                            className="h-80 w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Autenticação página de mudar senha"
                            src="/features/auth04.png"
                            className="h-80 w-full object-cover object-left"
                          />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 left-2 text-white" />
                      <CarouselNext className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 right-2 text-white" />
                    </Carousel>
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-primary">
                        Freelancer
                      </h3>
                      <p className="mt-2 text-lg/7 font-medium tracking-tight text-foreground">
                        Autenticação
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                        Autenticação completa com Auth.js:
                        <br />- Criação de conta e login
                        <br />- Autenticação social (Google e Github)
                        <br />- Validação de email com token
                        <br />- Recuperação de senha
                        <br />- Integração com Resend opcional.
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-border lg:rounded-bl-lg" />
                </div>
                <div className="relative lg:col-span-2">
                  <div className="absolute inset-px rounded-lg bg-card" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
                    <Carousel className="w-full">
                      <CarouselContent>
                        <CarouselItem>
                          <img
                            alt="Container postgrSQL e Adminer"
                            src="/features/docker01.png"
                            className="h-80 w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Admainer"
                            src="/features/docker02.png"
                            className="h-80 w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Admainer"
                            src="/features/docker03.png"
                            className="h-80 w-full object-cover object-left"
                          />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 left-2 text-white" />
                      <CarouselNext className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 right-2 text-white" />
                    </Carousel>
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-primary">
                        Freelancer
                      </h3>
                      <p className="mt-2 text-lg/7 font-medium tracking-tight text-foreground">
                        Containers Docker
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                        Já configurado com um container do PostgreSQL para
                        persistir seus dados localmente sem ter que configurar
                        um banco de dados com Supabase ou Neon + um container do
                        Adminer para você acessar seu banco de dados via
                        browser.
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-border" />
                </div>
                <div className="relative lg:col-span-2">
                  <div className="absolute inset-px rounded-lg bg-card max-lg:rounded-b-lg lg:rounded-br-lg" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-lg max-lg:rounded-b-lg lg:rounded-br-lg">
                    <Carousel className="w-full">
                      <CarouselContent>
                        <CarouselItem>
                          <img
                            alt="Dashboard"
                            src="/features/stripe03.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full object-cover object-left"
                          >
                            <source src="/crud-stripe.mp4" type="video/mp4" />
                            Seu navegador não suporta o elemento de vídeo.
                          </video>
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Dashboard"
                            src="/features/stripe01.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            alt="Dashboard"
                            src="/features/stripe02.png"
                            className="w-full object-cover object-left"
                          />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 left-2 text-white" />
                      <CarouselNext className="bg-primary border-primary absolute top-1/2 -translate-y-1/2 right-2 text-white" />
                    </Carousel>
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-primary">
                        Micro SaaS
                      </h3>
                      <p className="mt-2 text-lg/7 font-medium tracking-tight text-foreground">
                        Stripe
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                        O maior diferencial deste template é a possibilidade de
                        usar o próprio dashboard do Stripe para controlar os
                        planos e assinaturas do template. Você pode criar os
                        Produtos, Preços e Customers diretamente no Stripe e o
                        template vai consumir essas informações pelos eventos de
                        Webhook.
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-border max-lg:rounded-b-lg lg:rounded-br-lg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="bg-secondary/20 dark:bg-none py-24 min-h-svh w-full border-b dark:border-secondary-foreground/20"
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
                    Sim, você pode solicitar o reembolso a qualquer momento.
                    Para isso, entre em contato pelo e-mail
                    darlleybrito@gmail.com e forneça seu motivo. Irei analisar
                    seu pedido e o valor será reembolsado através do Stripe.
                    Geralmente, os reembolsos levam de 5 a 10 dias úteis para
                    serem processados e aparecerem no extrato do cliente.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-xl text-primary">
                    Como terei acesso ao template?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-lg">
                    Você pode fazer login ou criar uma conta na plataforma. Lá,
                    você encontrará os templates disponíveis para download em
                    sua assinatura.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-xl text-primary">
                    Como posso cancelar minha assinatura?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-lg">
                    Você pode cancelar sua assinatura diretamente em sua conta,
                    na seção de configurações de assinatura.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-xl text-primary">
                    Como posso mudar meu plano para um mais avançado?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-lg">
                    Para mudar seu plano, acesse a área de configurações dentro
                    de sua conta. Clique no botão "Atualizar plano".
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
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
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com/darlley"
                  className="group"
                  aria-label="GitHub"
                >
                  <svg
                    className="size-6 dark:fill-secondary-foreground"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                  </svg>
                </Link>
              </div>
              <p>
                Desenvolvido por{' '}
                <Link
                  href="https://darlley.dev"
                  className="text-primary font-bold"
                  target="_blank"
                >
                  Darlley Brito
                </Link>
              </p>
            </div>
            <p className="text-sm mt-2">
              &copy; {new Date().getFullYear()} SaaS Admin. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
