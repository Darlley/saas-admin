"use client"

import { signOut } from 'next-auth/react';
import { PageSettingsProps } from './PageSettings.types';
import { Button } from '../ui/button';
export default function PageSettings(props: PageSettingsProps) {
  const { session } = props;
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <Button onClick={() => signOut()}>Sair</Button>
    </div>
  );
}
