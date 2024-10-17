import PageSettings from '@/components/PageSettings';
import { auth } from '@/services/auth';

export default async function page() {
  const session = await auth();

  return <PageSettings session={session} />;
}
