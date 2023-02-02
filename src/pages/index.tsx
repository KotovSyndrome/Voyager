import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import SellingPoints from "../components/sellingPoints";
import LayoutWrapper from "../components/layoutWrapper";
import Image from "next/image";
import ExampleItinerary from '../assets/demo_itinerary.png'

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <LayoutWrapper>
      <div className="w-full h-full">
        <p className="text-4xl text-center mt-14 font-bold">Welcome to a stress-free vacation</p>

        <div className="grid grid-cols-1 mt-16 lg:grid-cols-2 gap-8">
          <SellingPoints/>

          <div className="flex justify-center lg:justify-end">
            <Image src={ExampleItinerary} alt='example itinerary' height={700} width={600}/>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-16 lg:grid-cols-2 gap-8">
          <SellingPoints/>

          <div className="flex justify-center lg:justify-end">
            <Image src={ExampleItinerary} alt='example itinerary' height={700} width={600}/>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-16 lg:grid-cols-2 gap-8">
          <SellingPoints/>

          <div className="flex justify-center lg:justify-end">
            <Image src={ExampleItinerary} alt='example itinerary' height={700} width={600}/>
          </div>
        </div>
      </div>
    </LayoutWrapper>
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
