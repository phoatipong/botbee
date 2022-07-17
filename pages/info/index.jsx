import { onValue, ref } from "firebase/database";
import { route } from "next/dist/server/router";
import React, { useEffect, useState } from "react";
import { db } from "../../src/plugins/firebaseConfig";
import { useRouter } from "next/router";

const Index = () => {
  const [info, setInfo] = useState([]);
  const route = useRouter();
  useEffect(() => {
    onValue(ref(db, "/infomation"), (snapshot) => {
      const res = snapshot.val();
      const arr = [];
      console.log(res);
      for (const i in res) {
        arr.push({ ...res[i], id: i });
      }
      setInfo(arr);
    });
  }, []);
  return (
    <div>
      <div className="flex ">
        <div className="flex box-content p-4 h-[32px] w-full  bg-[#8ab11d] text-white font-prompt text-2xl">
          <p className="mx-auto">คำแนะนำ</p>
        </div>
      </div>

      <div className="mt-5">
        {info &&
          info.map((item, index) => (
            <div className="flex" key={index}>
              <button
                className="w-full my-2 mx-4 h-20 border p-5 rounded-lg font-prompt text-center shadow-lg bg-[#8ab17d] text-white text-lg"
                onClick={() => route.push(`/info/${item.id}`)}
              >
                {item.title}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Index;
