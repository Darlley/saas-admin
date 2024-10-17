import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { EmailVerifyTokenProps } from './EmailVerifyToken.types';
import config from '../../../email-tailwind.config';
export default function EmailVerifyToken(props: EmailVerifyTokenProps) {
  const { name, from, to, url, subject } = props;
  return (
    <Tailwind config={config}>
      <Html>
        <Head />
        <Preview>Clique no botão para verificar seu e-mail</Preview>
        <Body className="bg-muted">
          <Container className="bg-background mx-auto py-5 pb-12 mb-16">
            <Section className="px-12">
              <Img
                src="https://www.darlley.dev/profile.jpg"
                width="50"
                height="50"
                alt="Stripe"
              />
              <Hr className="border-border my-5" />
              <Text className="text-muted-foreground text-base leading-6 text-left">
                Olá {name} 🤝 Obrigado por se registrar no nosso template de
                micro-SaaS para desenvolvedores. Estamos empolgados para
                ajudá-lo a iniciar seu projeto rapidamente!
              </Text>
              <Text className="text-muted-foreground text-base leading-6 text-left">
                Para começar, por favor confirme seu e-mail clicando no botão
                abaixo:
              </Text>
              <Button className="bg-primary rounded text-primary-foreground text-base font-bold no-underline text-center block w-full py-2.5" href={url}>
                Verificar este email
              </Button>
              <Hr className="border-border my-5" />

              <Text className="text-muted-foreground text-base leading-6 text-left">
                Após confirmar seu e-mail, você terá acesso completo ao painel
                de controle, onde poderá começar a personalizar seu projeto.
              </Text>
              <Text className="text-muted-foreground text-base leading-6 text-left">
                Se tiver alguma dúvida, não hesite em responder este e-mail (
                {from}). Boa codificação!
              </Text>
              <Text className="text-muted-foreground text-base leading-6 text-left">
                — Darlley Brasil
              </Text>
              <Hr className="border-border my-5" />
              <Text className="text-muted-foreground text-xs leading-4">
                Micro-SaaS Boilerplate, Campo Grande - MS -{' '}
                <Link className="text-primary" href="https://darlley.dev">
                  https://darlley.dev
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
