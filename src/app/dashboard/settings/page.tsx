import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/services/auth';

export default async function AdminSettings() {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}
