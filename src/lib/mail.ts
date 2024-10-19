import { Resend } from 'resend';

import EmailVerifyToken from '@/components/EmailVerifyToken';
import EmailResetPasswordToken from '@/components/EmailResetPasswordToken';

const resend = process.env.AUTH_RESEND_KEY ? new Resend(process.env.AUTH_RESEND_KEY!) : null;

type SendVerificationEmailProps = {
  name: string;
  from: string;
  to: string;
  url: string;
  subject: string;
};

export async function sendVerificationEmail({
  name,
  from,
  to,
  url,
  subject,
}: SendVerificationEmailProps) {
  const { host } = new URL(url);

  try {
    await resend?.emails.send({
      from,
      to,
      subject,
      react: EmailVerifyToken({ name, from, to, url, subject }),
    });
  } catch (error) {
    throw new Error(`E-mail não pôde ser enviado para ${to}`);
  }
}

export async function sendPasswordResetEmail({
  name,
  from,
  to,
  url,
  subject,
}: SendVerificationEmailProps) {
  const { host } = new URL(url);

  try {
    await resend?.emails.send({
      from,
      to,
      subject,
      react: EmailResetPasswordToken({ name, from, to, url, subject }),
    });
  } catch (error) {
    throw new Error(`E-mail não pôde ser enviado para ${to}`);
  }
}
