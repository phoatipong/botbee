import React from "react";
import Sidebar from "../components/Sidebar";
import Hearder from "../components/Hearder";
function statTable() {
  return (
    <div className="flex h-scree">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <main className="flex flex-col w-full h-screen bg-white overflow-x-hidden overflow-y-hiden mb-14">
            <Hearder title={"สถิติ"} />
            <div className=" mx-3   border rounded-lg pb-1">
              <table className="  w-full font-prompt">
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
                  <tr className="space-x-6 hover:bg-gray-300 border-dashed border-t">
                    <td>1</td>
                    <td>"29/07/2021, 15:30:57"</td>
                    <td>5436236271</td>
                    <td>queen</td>
                    <td>34.12 %</td>
                  </tr>

                  <tr className="space-x-6 hover:bg-gray-300 border-dashed border-t">
                    <td>2</td>
                    <td>"29/07/2021, 15:30:57"</td>
                    <td>5436236271</td>
                    <td>queen</td>
                    <td>34.12 %</td>
                  </tr>
                </tbody>
              </table>
              <div className="w-full border-t border-dashed">
                <div className="flex w-full justify-center">
                  <button className="text-center font-prompt p-1 text-yellow-500 font-light text-xs ">
                    prev
                  </button>
                  <button className="text-center font-prompt p-1  font-light text-xs">
                    1
                  </button>
                  <button className="text-center font-prompt p-1  font-light text-xs ">
                    2
                  </button>
                  <button className="text-center font-prompt p-1  font-light text-xs ">
                    3
                  </button>
                  <button className="text-center font-prompt p-1  font-light text-xs ">
                    ...50
                  </button>
                  <button className="text-center font-prompt p-1 text-yellow-500 font-light text-xs ">
                    next
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default statTable;
