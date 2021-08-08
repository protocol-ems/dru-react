import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

import Logout from "../userauth/Logout";

export default function Navbar() {
  const { userData } = useContext(UserContext);

  return (
    <div className="container items-center mx-auto">
      <div className="text-gray-700 transition duration-500 ease-in-out bg-white border rounded-lg  ">
        <div className="flex flex-col flex-wrap p-5 mx-auto md:items-center md:flex-row">
          <nav className="flex flex-wrap items-center justify-start text-base ">
            <ul className="items-center inline-block list-none lg:inline-flex">
              <li>
                <a
                  href="/"
                  className="px-4 py-1 mr-1 text-base text-black transition duration-500 ease-in-out transform   hover:text-green-400 "
                >
                  Pricing
                </a>
              </li>
            </ul>
          </nav>
          <a
            href="/"
            className="justify-center focus:outline-none md:ml-auto md:mr-auto"
          >
            <h2 className="block p-2 text-xl font-medium tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-blueGray-500 lg:text-x lg:mr-8">
              {" "}
              Protocol{" "}
            </h2>
          </a>
          <nav className="flex flex-wrap items-center justify-start text-base ">
            <ul className="items-center inline-block list-none lg:inline-flex">
              {userData.user !== null ? (
                <li className="px-4 py-1 mr-1 text-base text-black transition duration-500 ease-in-out transform   hover:text-green-400">
                  <Logout />
                </li>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="px-4 py-1 mr-1 text-base text-black transition duration-500 ease-in-out transform   hover:text-green-400 "
                  >
                    Login
                  </Link>
                  <Link
                    className="px-4 py-1 mr-1 text-base text-black transition duration-500 ease-in-out transform   hover:text-green-400 "
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
