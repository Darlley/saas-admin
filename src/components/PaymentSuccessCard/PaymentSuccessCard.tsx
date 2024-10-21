'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { Dialog, DialogContent } from '../ui/dialog';
import { PaymentSuccessCardProps } from './PaymentSuccessCard.types';

export default function PaymentSuccessCard(props: PaymentSuccessCardProps) {
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWindowDimensions({ width, height });

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Dialog
        open={isPaymentSuccessOpen}
        onOpenChange={setIsPaymentSuccessOpen}
      >
        <DialogContent className="p-0 h-max">
          <Card className="p-2">
            <CardHeader>
              <h1 className="text-xl sm:text-2xl font-bold text-primary text-center">
                É um prazer ter a sua confiança em nosso produto! 🥳
              </h1>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-4">
              <div className="flex justify-center items-center">
                <Confetti
                  width={500}
                  recycle={false}
                  numberOfPieces={200}
                  colors={[
                    '#26ccff',
                    '#a25afd',
                    '#ff5e7e',
                    '#88ff5a',
                    '#fcff42',
                    '#ffa62d',
                    '#ff36ff',
                  ]}
                />
              </div>
              <div className="flex items-center p-3 sm:p-4 bg-accent text-accent-foreground border border-accent rounded-lg">
                <span className="text-xl sm:text-2xl mr-2">💻</span>
                <p className="text-sm sm:text-base font-medium">
                  Sua decisão de investir em ferramentas de desenvolvimento
                  profissionais não foi apenas inteligente - foi transformadora.
                </p>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Seja você um desenvolvedor iniciante, um programador experiente
                ou um líder técnico, você acaba de desbloquear um mundo de
                possibilidades com nossa plataforma de desenvolvimento!
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Com as ferramentas que agora estão à sua disposição, você está
                pronto para:
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  'Desenvolver com Next.js',
                  'Implementar autenticação com Auth.js',
                  'Integrar pagamentos com Stripe e Mercado Pago',
                  'Utilizar banco de dados Postgres com ORM Prisma',
                  'Criar interfaces responsivas com Tailwind e Shadcn',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="bg-primary rounded-md size-6 flex items-center justify-center">
                      <Check className="stroke-primary-foreground size-4" />
                    </div>
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full text-sm sm:text-base"
                size="lg"
                variant="default"
              >
                <Link href="/dashboard">Aproveitar esta oferta exclusiva</Link>
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
