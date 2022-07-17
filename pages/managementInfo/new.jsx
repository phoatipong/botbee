import React from "react";
import Sidebar from "../../components/Sidebar";
import Hearder from "../../components/Hearder";
import { useEffect, useState } from "react";
import { onValue, ref as dbref, set } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db } from "../../src/plugins/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";

function New({ signout }) {
  const [inputData, setInputData] = useState({
    title: "",
    content: "",
    fileupload: "",
    partRef: "",
  });

  const route = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const handelSubmit = () => {
    const storage = getStorage();
    const refStorage = ref(
      storage,
      `/photos/Infomations/${inputData.fileupload.name}`
    );
    const uploadTask = uploadBytesResumable(refStorage, inputData.fileupload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const val = url;
          console.log(url);
          setInputData((prev) => ({ ...prev, img: val }));

          const infoRef = dbref(db, `/infomation/${inputData.partRef}`);
          set(infoRef, {
            title: inputData.title,
            content: inputData.content,
            image: val,
          });

          route.back();
        });
      }
    );
  };
  

  return (
    <div className="flex h-scree font-prompt">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          <Sidebar signOut={signout} />
          <main className="flex flex-col w-screen h-screen bg-white overflow-x-hidden overflow-y-hiden mb-14">
            <Hearder title={"เพิ่มคำแนะนำ"} />
            <div className="p-5 flex w-1/2">
              <div className="border p-3 w-full ">
                <div className="flex mb-3">
                  <p className="text-center text-xl">กรอกข้อมูล</p>
                </div>
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    handelSubmit();
                  }}
                  onReset={(e) => {
                    e.preventDefault();
                    setInputData({
                      title: "",
                      content: "",
                      fileupload: "",
                      partRef: "",
                    });
                  }}
                >
                  <div className="flex ">
                    <label htmlFor="" className="w-1/5">
                      หัวข้อ
                    </label>
                    <input
                      type="text"
                      value={inputData.title}
                      className="border text w-full p-1"
                      required
                      onChange={(e) => {
                        const val = e.target.value;
                        setInputData((prev) => ({
                          ...prev,
                          title: val,
                        }));
                      }}
                    />
                  </div>
                  <div className="flex mt-5 ">
                    <label htmlFor="" className="w-1/5">
                      Part Ref.
                    </label>
                    <input
                      type="text"
                      value={inputData.partRef}
                      className="border text w-full p-1"
                      required
                      onChange={(e) => {
                        const val = e.target.value;
                        setInputData((prev) => ({
                          ...prev,
                          partRef: val,
                        }));
                      }}
                    />
                  </div>

                  <div className="flex mt-5">
                    <label htmlFor="" className="w-1/5">
                      รายละเอียด
                    </label>
                    <textarea
                      type="text"
                      className="border text w-full p-1 h-40"
                      value={inputData.content}
                      required
                      onChange={(e) => {
                        const val = e.target.value;
                        setInputData((prev) => ({ ...prev, content: val }));
                      }}
                    />
                  </div>

                  <div className="flex mt-5">
                    <label htmlFor="" className="w-1/6">
                      อัพโหลดรูป
                    </label>
                    <input
                      type="file"
                      className="p-1"
                      required
                      onChange={(e) => {
                        const val = e.target.files[0];
                        setInputData((prev) => ({
                          ...prev,
                          fileupload: val,
                        }));
                      }}
                    />
                  </div>
                  <div className="flex mt-5">
                    <button
                      type="submit"
                      className=" bg-green-500 rounded text-white p-3 ml-auto mr-3"
                    >
                      Submit
                    </button>
                    <button
                      type="reset"
                      className=" bg-gray-500 rounded text-white p-3"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default New;
