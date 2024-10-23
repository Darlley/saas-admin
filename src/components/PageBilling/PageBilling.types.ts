import { Session } from 'next-auth';

export interface PageBillingProps {
  user: Session['user'] | null;
}
