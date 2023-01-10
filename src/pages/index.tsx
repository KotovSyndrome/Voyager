import { type NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import SplitLayout from "../components/splitLayout";
import SellingPoints from "../components/sellingPoints";
import DemoItinerary from "../components/demoItinerary";


const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <p className="text-4xl text-center mt-14">Welcome to a stress-free vacation</p>
      <SplitLayout leftChildren={<SellingPoints/>} rightChildren={<DemoItinerary/>}/>
    </>
  );
};

export default Home;

// export async function getStaticProps() {
//    Statically render page
// }



// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign"}
//       </button>
//     </div>
//   );
// };
