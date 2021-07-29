import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function CreateOrJoinHeader() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      <div className="container flex flex-col items-center px-5 py-8 mx-auto">
        {userData.user.company === 1 && userData.user.requestedCompany === 1 ? (
          <div>
            <div className="flex flex-col w-full mb-12 text-left lg:text-center">
              <h2 className="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font">
                Welcome to Protocol
              </h2>
              <h1 className="mx-auto mb-12 text-2xl font-semibold leading-none tracking-tighter text-black lg:w-1/2 sm:text-3xl title-font">
                More features when you are apart of an agency.
              </h1>
              <p className="mx-auto text-base font-medium leading-relaxed text-blueGray-700 lg:w-1/2">
                Join an agency or Create your agency today
              </p>
            </div>
            <div className="flex justify-between mx-auto">
              <Link to="join-company/" className="btn btn-accent">
                Join
              </Link>
              <Link to="create-company/" className="btn btn-accent">
                Create
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-base font-medium leading-relaxed ">
            <div className="text-green-400 text-2xl mb-12">
              Approval needed to view content.
            </div>
            <div className="mb-12">
              Contact your agency's administrator for them to approve your
              request.
            </div>
            <div>
              Need to change the company you want to join?{" "}
              <Link className="text-green-300 mx-4" to="/join-company">
                Click Here
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
