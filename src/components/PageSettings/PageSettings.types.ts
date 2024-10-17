import { Session } from "next-auth";

export interface PageSettingsProps {
  session?: Session | null;
}