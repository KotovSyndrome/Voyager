import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/navbar";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { Merriweather_Sans } from '@next/font/google'

const cabin = Merriweather_Sans({
  weight: ['400','500','600', '700'],
  style: ['normal','italic'],
  subsets: ['latin'],
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={cabin.className}>
        <div className="from-blue-500 via-teal-400 to-blue-500 bg-gradient-to-b text-white w-full">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

// bg-[#e3f4ff]