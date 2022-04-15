import CardStat from "../components/CardStat";
import Hearder from "../components/Hearder";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../src/plugins/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import StatChart from "../components/chart/StatChart";
import PercentBarChart from "../components/PercentBarChart";

function Home({}) {
  const [stat, setStat] = useState();
  const [percent, setPercent] = useState({
    good: 0,
    bad: 0,
    mite: 0,
    pollen: 0,
    enemy: 0,
    queen: 0,
  });
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
  }, [user, route]);

  useEffect(() => {
    if (!stat) return;
    const good = (stat.Good / stat.All) * 100;
    const bad = (stat.Bad / stat.All) * 100;
    const mite = (stat.Mite / stat.All) * 100;
    const pollen = (stat.Pollen / stat.All) * 100;
    const enemy = (stat.Enemy / stat.All) * 100;
    const queen = (stat.Queen / stat.All) * 100;
    setPercent({
      good: parseFloat(good.toFixed(2)),
      bad: parseFloat(bad.toFixed(2)),
      mite: parseFloat(mite.toFixed(2)),
      pollen: parseFloat(pollen.toFixed(2)),
      enemy: parseFloat(enemy.toFixed(2)),
      queen: parseFloat(queen.toFixed(2)),
    });
  }, [stat]);

  const signout = () => {
    auth.signOut();
  };

  return (
    <div className="flex h-scree">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          <Sidebar signOut={signout} />
          <main className="flex flex-col w-full h-screen bg-white overflow-x-hidden overflow-y-hiden mb-14">
            <Hearder title={"Dashboard"} />
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
                    title="ปกติ (Good)"
                    content={stat && stat.Good}
                    color="bg-green-500"
                    w="w-1/2"
                  />
                  <CardStat
                    title="มีควันไฟ (Bad)"
                    content={stat && stat.Bad}
                    color="bg-violet-500"
                    w="w-1/2"
                  />
                </div>
                <div className="flex mt-1 space-x-1">
                  <CardStat
                    title="มีตัวไร (Mite)"
                    content={stat && stat.Mite}
                    color="bg-amber-500"
                    w="w-1/2"
                  />
                  <CardStat
                    title={"ขาดเกสร (Pollen)"}
                    content={stat && stat.Pollen}
                    color="bg-orange-500"
                    w="w-1/2"
                  />
                </div>
                <div className="flex mt-1 space-x-1">
                  <CardStat
                    title="มีศัตรู (Enemy)"
                    content={stat && stat.Enemy}
                    color={"bg-red-500"}
                    w="w-1/2"
                  />
                  <CardStat
                    title="นางพญาหาย (Queen)"
                    content={stat && stat.Queen}
                    color={"bg-cyan-500"}
                    w="w-1/2"
                  />
                </div>
                <div className="flex mt-5 font-prompt text-xl">สรุปผลเป็นเปอร์เซ็น</div>
                <div className="flex mt-1 space-x-1">
                  <PercentBarChart
                    label={"ปกติ (Good)"}
                    percent={percent.good}
                    color="bg-green-500"
                  />
                  <PercentBarChart
                    label={"มีควันไฟ (Bad)"}
                    percent={percent.bad}
                    color="bg-violet-500"
                  />
                </div>
                <div className="flex mt-1 space-x-1">
                  <PercentBarChart
                    label={"มีตัวไร (Mite)"}
                    percent={percent.mite}
                    color="bg-amber-500"
                  />
                  <PercentBarChart
                    label={"ขาดเกสร (Pollen)"}
                    percent={percent.pollen}
                    color="bg-orange-500"
                  />
                </div>
                <div className="flex mt-1 space-x-1">
                  <PercentBarChart
                    label={"มีศัตรู (Enemy)"}
                    percent={percent.enemy}
                    color="bg-red-500"
                  />
                  <PercentBarChart
                    label={"นางพญาหาย (Queen)"}
                    percent={percent.queen}
                    color="bg-cyan-500"
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

export default Home;
