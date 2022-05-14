import Sidebar from "../../components/Sidebar";
import Hearder from "../../components/Hearder";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../src/plugins/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";

function Index({ signout }) {
  const [allInfo, setAllInfo] = useState({});
  const route = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user === null) {
      //   route.push("/login");
    } else {
      onValue(ref(db, "/infomation"), (snapshot) => {
        const res = snapshot.val();
        setAllInfo(res);
        console.log(res);
      });
    }
  }, [user, route]);
  return (
    <div className="flex h-scree">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          <Sidebar signOut={signout} />
          <main className="flex flex-col w-full h-screen bg-white overflow-x-hidden overflow-y-hiden mb-14">
            <Hearder title={"จัดการคำแนะนำ"} />
            <div className="p-5 flex">
              <button
                onClick={() => route.push("/managementInfo/new")}
                className="flex w-1/4 h-[200px] border m-4 shadow justify-center rounded-lg hover:opacity-50"
              >
                <div className="my-auto  text-[50px] text-gray-600">+</div>
              </button>
              {allInfo &&
                Object.entries(allInfo).map(([key, value]) => (
                  <button
                    key={key}
                    className="flex w-1/4 h-[200px] border m-4 shadow  justify-center text-center rounded-lg hover:opacity-50 "
                    onClick={() => route.push(`/managementInfo/${key}`)}
                  >
                    <div className="my-auto font-prompt w-1/2">
                      {value.title}
                    </div>
                  </button>
                ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Index;
