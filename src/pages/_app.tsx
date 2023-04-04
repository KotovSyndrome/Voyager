import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        <div className="bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 text-white w-full min-h-screen">

        {
        //@ts-ignore
        Component.tripPage ? (
          <>
            <Navbar />
            <Component {...pageProps} />
          </>
        ) : (
          <>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </>
        )}

        </div>
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

// bg-[#e3f4ff]

// current: from-blue-500 via-teal-400 to-blue-500 bg-gradient-to-b