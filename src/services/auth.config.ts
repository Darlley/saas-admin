import Github from 'next-auth/providers/github'
import Linkedin from 'next-auth/providers/linkedin'
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Github, Linkedin],
} satisfies NextAuthConfig