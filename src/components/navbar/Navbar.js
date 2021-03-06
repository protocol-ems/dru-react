import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "src/components/context/UserContext";
import Logout from "src/components/userauth/Logout";

export default function Navbar({ setIsAuth }) {
  const { userData } = useContext(UserContext);
  // The navbar is dynamic depending on if the user is logged in.
  // the OurProtocol text will redirect to '/' or '/'dashboard' depending on if the user is logged in.
  // same with logout / login & register buttons
  return (
    <div className="container items-center mx-auto">
      <div className="text-gray-700 bg-white border rounded-lg">
        <div className="flex flex-col flex-wrap p-5 mx-auto md:items-center md:flex-row justify-between">
          <nav className="flex flex-wrap items-center justify-between text-base ">
            {/* <ul className="items-center inline-block list-none lg:inline-flex">
              <li>
                <Link
                  to="/"
                  className="px-4 py-1 mr-1 text-base text-black transition duration-500 ease-in-out transform   hover:text-green-400 "
                >
                  Pricing
                </Link>
              </li>
            </ul> */}

            {userData.user !== undefined && userData.user !== null ? (
              <Link
                to="/dashboard"
                className="focus:outline-none md:mx-auto"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <div className="block p-2 text-4xl font-medium tracking-tighter text-black cursor-pointer">
                  {" "}
                  OurProtocol{" "}
                </div>
              </Link>
            ) : (
              <Link
                to="/"
                className="justify-center focus:outline-none md:mx-auto "
              >
                <div className="block p-2 text-4xl font-medium tracking-tighter text-black cursor-pointer">
                  OurProtocol{" "}
                </div>
              </Link>
            )}
          </nav>

          <nav className="flex flex-wrap items-center justify-start text-base ">
            <ul className="items-center inline-block list-none lg:inline-flex">
              {userData.user !== undefined && userData.user !== null ? (
                <div className="flex flex-wrap items-center justify-start">
                  <li className="px-4 py-1 mr-1 text-base text-black transition duration-500 ease-in-out transformhover:text-green-400">
                    <Logout
                      setIsAuth={setIsAuth}
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    />
                  </li>
                  {/* <Link
                    to="/dashboard"
                    className="px-4 py-1 mr-1 text-base text-black transition duration-500 ease-in-out transform   hover:text-green-400 "
                  >
                    Dashboard
                  </Link> */}
                </div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="px-4 py-1 mr-1 text-base text-black transition duration-500 ease-in-out transformhover:text-green-400 "
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    className="px-4 py-1 mr-1 text-base text-black transition duration-500 ease-in-out transform hover:text-green-400"
                    to="/register"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Register
                  </Link>
                  <Link
                    to="/offline-dashboard"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Offline Mode
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
