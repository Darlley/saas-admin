import { plans } from '@/constants/plans';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PageHomeProps } from './PageHome.types';
export default function PageHome(props: PageHomeProps) {
  // const {} = props
  return (
    <>
      <header className="h-svh py-6 mx-auto container flex-1 flex-grow flex flex-col text-center items-center justify-center">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
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
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
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
              <DialogHeader className='p-2 text-sm'>
                <DialogTitle>Demonstração</DialogTitle>
                <DialogDescription>
                  Descrição do video
                </DialogDescription>
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
          className="bg-secondary/20 py-24 h-full w-full border-b dark:border-secondary-foreground/20"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)]"></div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl md:text-4xl font-bold">
              Cresça seu negócio <br />
              com o <span className="text-primary">melhor investimento!</span>
            </h2>
          </div>

          <div className="max-w-[1400px] mx-auto mt-12 md:mt-16 px-4 2xl:px-0">
            <Tabs defaultValue="monthly">
              <TabsList className="grid w-full max-w-xs sm:max-w-md grid-cols-2 mx-auto mb-8 bg-primary-foreground">
                <TabsTrigger
                  value="monthly"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Mensal
                </TabsTrigger>
                <TabsTrigger
                  value="annual"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Anual
                </TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="flex">
                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full justify-center gap-6 lg:gap-8">
                  {plans.map((plan) => (
                    <Card
                      key={plan.name}
                      className={cn(
                        plan.popular && 'border-primary',
                        'max-w-xs h-full flex flex-col w-full mx-auto lg:mx-0'
                      )}
                    >
                      <CardHeader className="flex flex-col gap-4">
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-primary">{plan.name}</span>
                          {plan.popular && (
                            <Badge className="animate-pulse">Popular</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div>
                          <span className="text-5xl font-semibold">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(plan.monthlyPrice)}
                          </span>
                          <sub>/mês</sub>
                        </div>
                        {plan.name == 'Free' ? (
                          <Button className="w-full" variant="outline" asChild>
                            <Link href="register">Criar conta</Link>
                          </Button>
                        ) : (
                          <Button className="w-full">Assinar</Button>
                        )}
                      </CardHeader>
                      <CardContent className="border-t pt-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-x-3 text-sm"
                            >
                              <CheckCircle className="size-5 stroke-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="annual" className="flex">
                <div className="flex w-full justify-center gap-6 lg:gap-8">
                  {plans.map((plan) => (
                    <Card
                      key={plan.name}
                      className={cn(
                        plan.popular && 'border-primary',
                        'max-w-xs h-full flex flex-col w-full'
                      )}
                    >
                      <CardHeader className="flex flex-col gap-4">
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-primary">{plan.name}</span>
                          {plan.popular && (
                            <Badge className="animate-pulse">Popular</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div>
                          <span className="text-5xl font-semibold">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(plan.annualPrice / 12)}
                          </span>
                          <sub>/mês</sub>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Equivalente a{' '}
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(plan.annualPrice)}
                          /ano
                        </div>
                        {plan.name == 'Free' ? (
                          <Button className="w-full" variant="outline" asChild>
                            <Link href="register">Criar conta</Link>
                          </Button>
                        ) : (
                          <Button className="w-full">Assinar</Button>
                        )}
                      </CardHeader>
                      <CardContent className="border-t pt-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-x-3 text-sm"
                            >
                              <CheckCircle className="size-5 stroke-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="questions" className="py-32">
          <div className="max-w-[1400px] mx-auto grid grid-cols-12 px-4 2xl:px-0">
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

      <footer className="text-center py-10 text-sm">
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por{' '}
          <Link href="https://darlley.dev" className="text-primary font-bold">
            Qual seu nome?
          </Link>
        </p>
      </footer>
    </>
  );
}
