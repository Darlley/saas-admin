'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';

export default function PaymentCancelledCard() {
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(true);

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
                Não perca essa oportunidade!
              </h1>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-4">
              <p className="mb-4 text-muted-foreground">
                Você está a um passo de transformar sua carreira com ferramentas de desenvolvimento profissionais. Não deixe as novas tecnologias passarem despercebidas!
              </p>
              <p className="mb-4 text-muted-foreground">
                Lembre-se: investir em conhecimento hoje é garantir oportunidades amanhã. Milhares de desenvolvedores já estão colhendo os frutos de seus prórprios micro-saas. E você?
              </p>
              <p className="mb-4 font-semibold text-warning">
                Oferta por tempo limitado: Assine agora e ganhe acesso a cursos exclusivos por 30 dias grátis!
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                className="w-full text-sm sm:text-base"
                size="lg"
                variant="default"
              >
                Aproveitar esta oferta exclusiva
              </Button>
              <Button
                asChild
                className="w-full text-sm sm:text-base"
                size="lg"
                variant="outline"
              >
                <Link href="/dashboard">Fechar</Link>
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
