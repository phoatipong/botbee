import React, { useState } from "react";
import { app } from "../src/plugins/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { async } from "@firebase/util";
import { useEffect } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const route = useRouter();
  const singIn = async (email, password) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        route.push("/");
        // console.log(user.auth);
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/user-not-found":
            setErrorCode("User incorrect");
            break;
          case "auth/wrong-password":
            setErrorCode("Password incorrect");
            break;
          default:
            setErrorCode(errorCode);
        }
      });
  };

  useEffect(() => {
    console.log(errorCode);
    if (!errorCode) return;

    console.log(errorCode);
  }, [errorCode]);

  return (
    <>
      <div className="grid place-content-center justify-center align-middle  items-center h-screen">
        <h1 className="font-bold font-prompt text-xl ">
          ระบบจำแนกสถานการณ์ในกล่องเลี้ยงผึ้งด้วยเสียงผ่านไลน์แชทบอท
        </h1>
        <div className="p-5 pb-2 border shadow rounded  ">
          <div className="felx space-y-2 p-5 ">
            <div>
              <span className="text-red-500  font-kanit text-xs text-left ">
                {errorCode}
              </span>
              <input
                className="w-full border rounded-full p-2 font-prompt"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                className="w-full border rounded-full p-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-3 mb-0">
            <button
              className="border bg-blue-600 p-2  rounded-full w-full text-white font-bold font-prompt hover:bg-blue-700"
              onClick={() => singIn(email, password)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
