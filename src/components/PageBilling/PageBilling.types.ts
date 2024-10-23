import { Session } from "next-auth";

export interface PageBillingProps {
  session: Session | null;
}