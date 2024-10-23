import { getUserWithId } from '@/actions/getUserWithId';
import PageBilling from '@/components/PageBilling';
import { auth } from '@/services/auth';

export default async function page() {
  const session = await auth();

  const user = await getUserWithId(session?.user?.id);

  return <PageBilling user={user} />;
}
