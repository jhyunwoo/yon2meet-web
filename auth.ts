import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Kakao],
  adapter: DrizzleAdapter(db),
});
