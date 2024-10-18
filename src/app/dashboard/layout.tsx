import DashboardPanel from '@/components/DashboardPanel';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'DASHBOARD | Micro-SaaS Name',
    template: '%s | Micro-SaaS Name',
  },
  description: 'Micro-SaaS Description',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DashboardPanel>{children}</DashboardPanel>;
    </SessionProvider>
  );
}
