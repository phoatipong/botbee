import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataSnapshot, onValue, query, ref } from "firebase/database";
import { db } from "../../../src/plugins/firebaseConfig";
import Image from "next/image";
import { route } from "next/dist/server/router";
function Info({}) {
  const [fetchData, setFetchData] = useState([]);
  const rounter = useRouter();
  const params = rounter.query;

  useEffect(() => {
    if (!params) return;
    onValue(ref(db, `/infomation/${params.slug}`), (snapshot) => {
      const res = snapshot.val();
      setFetchData(res);
    });
  }, [params]);

  useEffect(() => {
    if (!fetchData) return;
    console.log(fetchData);
  }, [fetchData]);
  return (
    <>
      <div className="flex box-content p-4 h-[32px] bg-yellow-500 text-white font-prompt text-2xl">
        <button className="mr-4" onClick={() => rounter.push("/info")}>
          {"<"}
        </button>
        <span>{fetchData?.title && fetchData.title}</span>
      </div>
      <div className="flex items-center justify-center mt-3">
        {fetchData?.image && (
          <Image
            src={fetchData.image}
            width={300}
            height={200}
            alt={fetchData.title}
            layout={"intrinsic"}
            className="rounded-lg"
          />
        )}
      </div>
      <div className="flex px-6 mt-3  font-prompt">
        {fetchData?.content && fetchData.content}
      </div>
    </>
  );
}

export default Info;
