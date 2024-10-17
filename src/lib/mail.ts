import { Resend } from 'resend';

import EmailTemplate from "@/components/EmailTemplate";
import EmailVerifyToken from '@/components/EmailVerifyToken';

const resend = new Resend(process.env.AUTH_RESEND_KEY);

type SendVerificationEmailProps = {
  name: string;
  from: string;
  to: string;
  url: string;
  subject: string;
}

export async function sendVerificationEmail({
  name,
  from,
  to,
  url,
  subject,
}: SendVerificationEmailProps) {
  const { host } = new URL(url)
  
  try {
    await resend.emails.send({
      from,
      to,
      subject,
      react: EmailVerifyToken({ name, from, to, url, subject }),
    });
  } catch (error) {
    throw new Error(`E-mail não pôde ser enviado para ${to}`);
  }
}
