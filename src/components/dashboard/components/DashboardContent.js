import React from "react";
import UserList from "../components/UserList";
import { Link } from "react-router-dom";
import ViewDocuments from "./documents/ViewDocuments";

export default function DashboardContent({
  companyUsers,
  userWaitList,
  setCompanyUsers,
  setUserWaitList,
  companyDocuments,
  setCompanyDocuments,
}) {
  return (
    <div className="flex flex-col w-full ">
      <ViewDocuments
        companyDocuments={companyDocuments}
        setCompanyDocuments={setCompanyDocuments}
      />
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
      <div className="divider"></div>

      <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
        content
      </div>
    </div>
  );
}
