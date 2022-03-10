import React, { useState } from "react";
import { app } from "../src/plugins/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import { async } from "@firebase/util";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="grid place-content-center justify-center align-middle  items-center h-screen">
      <div className="p-5 pb-2 border shadow rounded text-center ">
        <h1 className="font-bold font-sans text-xl">BOT BEE</h1>

        <div className="felx space-y-2 p-5">
          <div>
            <input
              className="border rounded-full p-2"
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
              className="border rounded-full p-2"
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
            className="border bg-blue-600 p-2  rounded-full w-full 
          text-white font-bold hover:bg-blue-700"
            onClick={() => singIn(email, password)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
