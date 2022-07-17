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
  const [totalPage, setTotalPage] = useState();
  const [rows, setRows] = useState(10);
  const route = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const signout = () => {
    auth.signOut();
  };
  useEffect(() => {
    if (!user) return route.push("/login");
    onValue(query(ref(db, "/log")), (snapshot) => {
      const res = snapshot.val();
      const size = snapshot.size;
      let data = [];
      const i = size;
      for (const key in res) {
        data.unshift({ ...res[key], id: i, key: key });
        i--;
      }
      setFetchData(data);
      setTotalPage(Math.ceil(size / rows));
    });
  }, [user, route, current, totalPage]);

  useEffect(() => {
    if (!current) return;
    if (!fetchData) return;

    if (current === 1) return setShowdata(fetchData.slice(current - 1, rows));
    setShowdata(fetchData.slice(current * rows - rows, current * rows));
  }, [fetchData, current, totalPage]);

  useEffect(() => {
    if (!rows) return;
    setCurrent(1);
    setTotalPage(Math.ceil(fetchData.length / rows));
  }, [rows]);

  const nextPage = () => {
    if (current < totalPage) {
      setCurrent(current + 1);
    }
  };
  const prevPage = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  return (
    <div className="flex h-scree">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          <Sidebar signOut={signout} />
          <main className="flex flex-col w-full h-screen bg-white overflow-x-hidden overflow-y-hiden mb-14">
            <Hearder title={"ประวัติการณ์วินิจฉัย"} />
            <div className=" mx-3 overflow-auto   border rounded-lg pb-1">
              <div className="h-[500px] w-full">
                <table className="w-full p-5 font-prompt">
                  <thead className="items-center text-center border-b  ">
                    <tr>
                      <th>ลำดับ</th>
                      <th>วัน-เวลา</th>
                      <th>ผู้ใช้งาน</th>
                      <th>Class</th>
                      <th>ความน่าจะเป็น</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {showdata &&
                      showdata.map((item) => (
                        <tr
                          key={item.key}
                          className=" h-[40px] space-x-6 hover:bg-gray-300 border-dashed border-b"
                        >
                          <td>{item.id}</td>
                          <td>{item.date}</td>
                          <td>{item.sendfrom}</td>
                          <td>{item.class}</td>
                          <td>{(item.probability * 100).toFixed()} %</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full mt-3">
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
                <span className="ml-4 font-prompt">rows</span>
                <select
                  name="rows"
                  className="ml-3 w-12 border border-yellow-500 rounded-md"
                  onChange={(e) => {
                    setRows(e.target.value);
                  }}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default StatTable;
