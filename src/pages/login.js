import React from "react";

const LoginPage = () => {
  return (
    <div class="flex h-screen bg-gray-800">
      <div className="m-auto" style={{ marginTop: "30vh" }}>
        <p className="text-xl font-bold text-white">
          Netsle Dashboard.
        </p>
        <form className="bg-white shadow-md rounded px-32 pt-6 pb-8 mb-4">
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
            ></input>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 mt-4 rounded">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
