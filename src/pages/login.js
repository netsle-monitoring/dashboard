import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/actions/user.actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.authentication.status);
  const loginError = useSelector((state) => state.authentication.error);
  const loginAssets = useSelector((state) => state.authentication.loginAssets);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  // TODO: Rethink about this one, maybe it should be somewhere else
  // more generic? for example work in other places of the code globally
  // TODO: Rethink about the security of the matter, localStorage bad cookies good :)
  useEffect(() => {
    if (loginStatus === "success") {
      localStorage.setItem("refreshToken", loginAssets.refreshToken);
      localStorage.setItem("accessToken", loginAssets.accessToken);
      localStorage.setItem("accessTokenExpiresOn", loginAssets.expiresOn);

      document.location.href = "/";
    }
  }, [loginStatus]);

  return (
    <div class="flex h-screen bg-gray-800">
      <div className="m-auto" style={{ marginTop: "30vh" }}>
        <p className="text-xl font-bold text-white">Netsle Dashboard.</p>
        <form
          className="bg-white shadow-md rounded px-32 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 mt-4 rounded"
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
        {
          loginStatus === "error" && (
            <div class="shadow-md bg-red-500 rounded border-2 border-red-400 text-white">
              <p class="font-bold text-xl">{loginError}</p>
            </div>
          )
        }

      </div>
    </div>
  );
};

export default LoginPage;
