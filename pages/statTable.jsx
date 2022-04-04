import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Hearder from "../components/Hearder";
import { useRouter } from "next/router";
import {
  endAt,
  limitToFirst,
  limitToLast,
  onValue,
  orderByChild,
  orderByValue,
  query,
  ref,
  startAfter,
  startAt,
} from "firebase/database";
import { db } from "../src/plugins/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

function StatTable() {
  const [fetchData, setFetchData] = useState([]);
  const [showdata, setShowdata] = useState([]);
  const [current, setCurrent] = useState(1);
  const [currentId, setCurrentId] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [length, setLength] = useState(0);
  const route = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
   // if (!user) return route.push("/login");
    onValue(query(ref(db, "/log")), (snapshot) => {
      const res = snapshot.val();
      const size = snapshot.size;
      let data = [];
      let i = currentId;
      for (const key in res) {
        data.push({ ...res[key], id: i, key: key });
        i++;
      }
      setFetchData(data);
      setTotalPage(Math.ceil(size/10))
    });
  }, [user, route]);

  useEffect(() => {
    if (!current) return;
    if (!fetchData) return;
    console.log(fetchData.slice(current - 1, 10));
    if (current === 1) return setShowdata(fetchData.slice(current - 1, 10));
    setShowdata(fetchData.slice(current*10-10,current*10));
  }, [fetchData, current]);

  const nextPage = () => {
    if (current < totalPage) {
      setCurrent(current + 1);
      setCurrentId(currentId + 10);
    }
  };
  const prevPage = () => {
    if (current > 1) {
      setCurrent(current - 1);
      setCurrentId(currentId - 10);
    }
  };

  return (
    <div className="flex h-scree">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <main className="flex flex-col w-full h-screen bg-white overflow-x-hidden overflow-y-hiden mb-14">
            <Hearder title={"สถิติ"} />
            <div className=" mx-3 overflow-auto   border rounded-lg pb-1">
              <div className="h-[500px] w-full">
                <table className="h-[500px] w-full p-5 font-prompt table-fixed">
                  <thead className="items-center text-center border-b  ">
                    <tr>
                      <th>ลำดับ</th>
                      <th>วัน เวลา</th>
                      <th>ผู้ใช้งาน</th>
                      <th>Class</th>
                      <th>ความแม่นยำ</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {showdata &&
                      showdata.map((item) => (
                        <tr
                          key={item.key}
                          className=" h-[40px] space-x-6 hover:bg-gray-300 border-dashed border-t"
                        >
                          <td>{item.id}</td>
                          <td>{item.date}</td>
                          <td>{item.sendfrom}</td>
                          <td>{item.class}</td>
                          <td>{item.probability * 100} %</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full">
              <div className="flex w-full justify-center">
                <button
                  className="text-center font-prompt p-1 text-yellow-500 font-light text-xs "
                  onClick={prevPage}
                >
                  prev
                </button>
                <div className="space-x-3">
                  <span>{current}</span>
                  <span>of</span>
                  <span>{totalPage}</span>
                </div>
                <button
                  className="text-center font-prompt p-1 text-yellow-500 font-light text-xs "
                  onClick={nextPage}
                >
                  next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default StatTable;
