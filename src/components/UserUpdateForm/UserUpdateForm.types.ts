import { Session } from "next-auth";

export interface UserUpdateFormProps {
  session?: Session | null;
}