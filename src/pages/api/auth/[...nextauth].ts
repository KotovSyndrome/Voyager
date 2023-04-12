import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { create } from "domain";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        // const userWithProfile = await prisma.user.findUnique({
        //   where: { id: session.user.id},
        //   include: { profile: true }
        // })

        //@ts-ignore
        session.profile = userWithProfile?.profile
      }
      return session;
    },
  },
  // events: {
  //   async createUser(message) {
  //     const { id, name }  = message.user

  //     await prisma.profile.create({
  //       data: {
  //         bio: '',
  //         username: name || `user${id}`,
  //         distanceUnits: 'MILES',
  //         dateFormat: 'MONTH',
  //         timeFormat: 'TWELVE',
  //         commentsNotification: true,
  //         remindersNotification: true,
  //         collaboratorJoinedNotification: true,
  //         user: {
  //           connect: { id: id },
  //         },
  //       }
  //     })
  //   }
  // },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    // GoogleProvider({
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: env.FACEBOOK_CLIENT_ID,
    //   clientSecret: env.FACEBOOK_CLIENT_SECRET,
    // }),
    // AppleProvider({
    //   clientId: env.APPLE_CLIENT_ID,
    //   clientSecret: env.APPLE_CLIENT_SECRET,
    // }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
