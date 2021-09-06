import React, { useContext } from "react";
import UserList from "../components/UserList";
import { Link } from "react-router-dom";
import ViewDocuments from "./documents/ViewDocuments";

import UserContext from "../../context/UserContext";
import ImageCenter from "./documents/ImageCenter";

export default function DashboardContent({
  companyUsers,
  userWaitList,
  setCompanyUsers,
  setUserWaitList,
  companyDocuments,
  setCompanyDocuments,
}) {
  const { userData } = useContext(UserContext);

  return (
    <div className="flex flex-col w-full ">
      {/* <button className="btn btn-info" onClick={() => console.log(userData)}>
        Log user Data
      </button> */}
      <ViewDocuments
        companyDocuments={companyDocuments}
        setCompanyDocuments={setCompanyDocuments}
      />
      {userData.user && userData.user.employee_type === 4 && (
        <div className=" bg-white flex flex-row flex-wrap justify-between  card border shadow-xl px-4 py-4 mb-12">
          <Link to="/create-document-header" className="btn btn-accent my-4">
            Document Labels
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
      )}
      {userData.user && userData.user.employee_type === 4 && (
        <div>
          <div className="bg-white border rounded-3xl mb-4 p-4 shadow-xl ">
            <h2 className="text-center text-4xl py-4">Current Employees</h2>
            {companyUsers !== null ? (
              <div className="h-64 overflow-auto">
                {/* make it So that the employee's title is the drop down. Not a seperate column. */}

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
          <div className="divider py-8"></div>

          <div className="bg-white border rounded-3xl mb-4 p-4 shadow-xl">
            <div className="text-center text-4xl py-4">Image Center</div>
            <ImageCenter companyDocuments={companyDocuments} />
          </div>
        </div>
      )}
    </div>
  );
}
