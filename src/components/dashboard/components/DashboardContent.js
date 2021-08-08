import React from "react";
import UserList from "../components/UserList";
import { Link } from "react-router-dom";

export default function DashboardContent({
  companyUsers,
  userWaitList,
  setCompanyUsers,
  setUserWaitList,
}) {
  return (
    <div className="flex flex-col w-full pt-24">
      <div className=" bg-white flex flex-row flex-wrap justify-between  card border shadow-xl px-4 py-4 mb-12">
        <Link to="/create-document-header" className="btn btn-accent my-4">
          Create, Edit, or Delete a Document Label
        </Link>
        <Link to="/create-medicine" className="btn btn-accent my-4">
          Create New Medicine
        </Link>
        <Link to="/create-procedure" className="btn btn-accent my-4">
          Create New Procedure
        </Link>
        <Link to="/create-protocol" className="btn btn-accent my-4">
          Create New Protocol
        </Link>
      </div>

      <div className="bg-white border rounded-3xl mb-4 p-4 shadow-xl ">
        <h2 className="text-center text-4xl py-4">Current Employees</h2>
        {companyUsers !== null ? (
          <div className="h-64 overflow-auto">
            <UserList
              users={companyUsers}
              setCompanyUsers={setCompanyUsers}
              list="current"
            />
          </div>
        ) : (
          <div className="mx-auto loader">Loading</div>
        )}
      </div>
      <div className="divider py-8"></div>
      <div className="bg-white border rounded-3xl mb-4 p-4 shadow-xl">
        <h2 className="text-center text-4xl py-4">
          Users who have requested acess
        </h2>
        {companyUsers !== null ? (
          <div className=" h-64 overflow-auto">
            <UserList
              users={userWaitList}
              setUserWaitList={setUserWaitList}
              setCompanyUsers={setCompanyUsers}
              list="requested"
            />
          </div>
        ) : (
          <div className="mx-auto loader">Loading</div>
        )}
      </div>
      <div className="divider"></div>

      <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
        content
      </div>
    </div>
  );
}

// .loader,
// .loader:before,
// .loader:after {
//   background: #3fa79b;
//   -webkit-animation: load1 1s infinite ease-in-out;
//   animation: load1 1s infinite ease-in-out;
//   width: 1em;
//   height: 4em;
// }
// .loader {
//   color: #3fa79b;
//   text-indent: -9999em;
//   margin: 88px auto;
//   position: relative;
//   font-size: 11px;
//   -webkit-transform: translateZ(0);
//   -ms-transform: translateZ(0);
//   transform: translateZ(0);
//   -webkit-animation-delay: -0.16s;
//   animation-delay: -0.16s;
// }
// .loader:before,
// .loader:after {
//   position: absolute;
//   top: 0;
//   content: '';
// }
// .loader:before {
//   left: -1.5em;
//   -webkit-animation-delay: -0.32s;
//   animation-delay: -0.32s;
// }
// .loader:after {
//   left: 1.5em;
// }
// @-webkit-keyframes load1 {
//   0%,
//   80%,
//   100% {
//     box-shadow: 0 0;
//     height: 4em;
//   }
//   40% {
//     box-shadow: 0 -2em;
//     height: 5em;
//   }
// }
// @keyframes load1 {
//   0%,
//   80%,
//   100% {
//     box-shadow: 0 0;
//     height: 4em;
//   }
//   40% {
//     box-shadow: 0 -2em;
//     height: 5em;
//   }
// }
