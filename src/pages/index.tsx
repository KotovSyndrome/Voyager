import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import LayoutWrapper from "../components/layoutWrapper";
import Image from "next/image";
import ExampleItinerary from '../assets/exampleItinerary.png'
import BeachVacay from '../assets/beach_vacation.avif'
import DiscoverItineraries from '../assets/search_example.png'
import CollaborateExample from '../assets/trips.png'


  const displayStuff = [
    {
      header: 'All your trip details in one place',
      details: 'Organize every day with ease. Add activities, the time at which they take place, and see routes between activites on the map.',
      image: ExampleItinerary
    },
    {
      header: 'Discover new attractions',
      details: 'Get inspired by where others have traveled. View thier itineraries and create your own template from them.',
      image: DiscoverItineraries
    },
    {
      header: 'Plan trips with friends and family',
      details: 'Invite people to work with you in real-time so everyone is always up to date on whats happening next.',
      image: CollaborateExample,
      commingSoon: true
    },
  ]


const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <LayoutWrapper>
      <div className="w-full pb-10">
        <p className="text-5xl text-center mt-20 font-bold">Welcome to a stress-free vacation</p>

        <div className="w-full">
          <Image src={BeachVacay} alt='Woman lying on the beach' height={800} width={1200}  className='rounded-xl mt-10 mx-auto drop-shadow-lg'/>
        </div>

        {displayStuff.map((card, i) => {
          return (
            <div key={card.header} className="grid grid-cols-1 grid-rows-2 mt-32 xl:mt-44 xl:grid-cols-3 xl:grid-rows-none gap-y-8 xl:gap-8">
              <div className={`flex justify-center items-center ${i % 2 !== 0 && 'xl:order-last'}`}>
                <div className='border-2 bg-white bg-opacity-10 rounded-xl p-4 w-2/3 h-fit col-span-1'>
                  {card.header === 'Plan trips with friends and family' && <p className="border-2 border-teal-200 bg-teal-400 rounded-lg w-fit px-1 mb-1">Coming soon</p>}
                  <p className="text-2xl font-bold">{card.header}</p>
                  <p className="text-gray-300 mt-2">{card.details}</p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end col-span-2">
                <Image src={card.image} alt='example itinerary' height={700} width={1100} className='rounded-xl drop-shadow-lg'/>
              </div>
            </div>
          )
        })}


        <div className="w-full mt-32 xl:mt-44">
          <h1 className="text-4xl text-center"> And more to come, including...</h1>
        </div>

        <div className="border-2 border-white bg-white bg-opacity-10 mt-10 rounded-xl p-2 text-2xl w-fit">
          <div className="flex justify-between space-x-2">
            <div className="w-fit xl:w-2/3 xl:h-32 p-2 rounded-xl bg-green-300 bg-opacity-80">
              <p>AI activity suggestions</p>
              <p className="text-base">Already have some places in mind but don't know where else? Let us suggest the most attracitve activities at any destination.</p>
            </div>

            <div className="w-fit xl:w-2/3 xl:h-32 p-2 rounded-xl bg-sky-300 bg-opacity-80">
              <p>AI genenerated trip templates</p>
              <p className="text-base">Doing research on points of interest is hard. Kick back and let us do the planning for you.</p>
            </div>
          </div>

          <div className="flex justify-between mt-2 space-x-2">
            <div className="w-fit xl:w-2/3 xl:h-32 p-2 rounded-xl bg-amber-300 bg-opacity-80">
              <p>Notifications</p>
              <p className="text-base">Get notified whenever something happens, whether thats a friend accepting your invite request or someone commenting on your trip.</p>
            </div>

            <div className="w-fit xl:w-2/3 xl:h-32 p-2 rounded-xl bg-rose-300 bg-opacity-80">
              <p>Routes to and between activities</p>
              <p className="text-base">Never wonder how long getting to places will take. We'll let you know so you can plan accordingly.</p>
            </div>
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
