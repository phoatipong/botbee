import CardStat from "../components/CardStat";
import Hearder from "../components/Hearder";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../src/plugins/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import StatChart from "../components/chart/StatChart";

function Home({}) {
  const [stat, setStat] = useState();
  const route = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;


  useEffect(() => {
    if (user === null) {
      route.push("/login");
    } else {
      onValue(ref(db, "/prediction"), (snapshot) => {
        setStat(snapshot.val());
      });
    }
  }, [user,route]);

  const signout = () => {
    auth.signOut();
  };

  return (
    <div className="flex h-scree">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          <Sidebar signOut={signout} />

          <main className="flex flex-col w-full h-screen bg-white overflow-x-hidden overflow-y-hiden mb-14">
            <Hearder title={"Dashbord"} />
            <div className="flex">
              <div className="w-1/2 mx-auto px-6 py-8 ">
                <div className="flex space-x-5 ">
                  <CardStat
                    title="การใช้งานทั้งหมด"
                    content={stat && stat.All}
                    w="w-full"
                    color="bg-yellow-500"
                  />
                </div>

                <div className="flex mt-5 space-x-1">
                  <CardStat
                    title="Good"
                    content={stat && stat.Good}
                    color="bg-green-500"
                    w="w-1/2"
                  />
                  <CardStat
                    title="Bad"
                    content={stat && stat.Bad}
                    color="bg-violet-500"
                    w="w-1/2"
                  />

                  <CardStat
                    title={"Pollen "}
                    content={stat && stat.Pollen}
                    color="bg-orange-500"
                    w="w-1/2"
                  />
                </div>
                <div className="flex mt-1 space-x-1">
                  <CardStat
                    title="Mite"
                    content={stat && stat.Mite}
                    color="bg-amber-500"
                    w="w-1/2"
                  />
                  <CardStat
                    title="Enemy"
                    content={stat && stat.Enemy}
                    color={"bg-red-500"}
                    w="w-1/2"
                  />
                </div>
                <div className="flex mt-1 space-x-1">
                  <CardStat
                    title="Queen"
                    content={stat && stat.Queen}
                    color={"bg-cyan-500"}
                    w="w-full"
                  />
                </div>
              </div>
              <div className="w-1/2 mx-auto px-6 py-8 ">
                {stat && <StatChart data={stat} />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(ctx) {
//   const auth = await getAuth();
//   const user = await auth.currentUser;
//   console.log("getServerSideProps" + auth);
//   const dbref = await ref(db, "/prediction");
//   let stat = null;
//   onValue(dbref, (snapshot) => {
//     stat = snapshot.val();
//   });

//   return { props: { stat: stat, user: user } };
// }

export default Home;
