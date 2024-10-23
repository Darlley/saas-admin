import PageBilling from '@/components/PageBilling';
import { auth } from '@/services/auth';

export default async function page() {
  const session = await auth();
  return <PageBilling session={session} />;
}
