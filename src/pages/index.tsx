import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import SellingPoints from "../components/sellingPoints";
import LayoutWrapper from "../components/layoutWrapper";
import Image from "next/image";
import ExampleItinerary from '../assets/exampleItinerary.png'
import BeachVacay from '../assets/beach_vacation.avif'
import DiscoverItineraries from '../assets/search_example.png'
import CollaborateExample from '../assets/trips.png'

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <LayoutWrapper>
      <div className="w-full pb-10">
        <p className="text-5xl text-center mt-20 font-bold">Welcome to a stress-free vacation</p>

        <div className="w-full">
          <Image src={BeachVacay} alt='Woman lying on the beach' height={800} width={1200}  className='rounded-xl mt-10 mx-auto drop-shadow-lg'/>
        </div>

        <div className="grid grid-cols-1 mt-16 lg:grid-cols-3 gap-8">
          <div className="flex justify-center items-center">
            <div className="border-2 bg-white bg-opacity-10 rounded-xl p-4 w-2/3 h-2/3 col-start-1 col-end-2">
              <p className="text-2xl font-bold">All your trip details in one place</p>
              <p className="text-gray-300 mt-2">Organize every day with ease. Add activities, the time at which they take place, and see routes between activites on the map.</p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end col-start-2 col-end-4">
            <Image src={ExampleItinerary} alt='example itinerary' height={700} width={1100} className='rounded-xl '/>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-16 lg:grid-cols-3 gap-8">
          <div className="flex justify-center lg:justify-end col-start-1 col-end-3">
            <Image src={DiscoverItineraries} alt='example itinerary' height={700} width={1100} className='rounded-xl '/>
          </div>

          <div className="flex justify-center items-center">
            <div className="border-2 bg-white bg-opacity-10 rounded-xl p-4 w-2/3 h-2/3 col-start-3 col-end-4">
              <p className="text-2xl font-bold">Discover new attractions</p>
              <p className="text-gray-300 mt-2">Get inspired by where others have traveled. View thier itineraries and create your own template from them.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-16 lg:grid-cols-3 gap-8">
          <div className="flex justify-center items-center">
            <div className="border-2 bg-white bg-opacity-10 rounded-xl p-4 w-2/3 h-2/3 col-start-1 col-end-2">
              <p className="border-2 border-teal-200 bg-teal-400 rounded-lg w-fit px-1 mb-1">Coming soon</p>
              <p className="text-2xl font-bold">Plan trips with friends and family</p>
              <p className="text-gray-300 mt-2">Invite people to work with you in real-time so everyone is always up to date on whats happening next.</p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end col-start-2 col-end-4">
            <Image src={CollaborateExample} alt='example itinerary' height={700} width={1100} className='rounded-xl '/>
          </div>
        </div>

        <div className="w-full mt-16">
          <h1 className="text-4xl text-center"> And so much more...</h1>
        </div>

        {/* <div className="grid grid-cols-1 mt-16 lg:grid-cols-2 gap-8">
          <SellingPoints/>

          <div className="flex justify-center lg:justify-end">
            <Image src={ExampleItinerary} alt='example itinerary' height={700} width={600}/>
          </div>
        </div> */}
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
