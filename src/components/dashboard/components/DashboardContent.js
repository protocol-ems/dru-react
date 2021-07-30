import React from "react";
import UserList from "../components/UserList";

export default function DashboardContent({
  companyUsers,
  userWaitList,
  setCompanyUsers,
  setUserWaitList,
}) {
  return (
    <div className="flex flex-col w-full pt-24">
      <div className="border rounded-3xl mb-4 p-4 shadow-xl">
        <h2 className="text-center text-4xl py-4">Current Employees</h2>
        {companyUsers !== null ? (
          <div className="overflow-auto">
            <UserList
              users={companyUsers}
              setCompanyUsers={setCompanyUsers}
              list="current"
            />
          </div>
        ) : (
          <div className="mx-auto">Loading</div>
        )}
      </div>
      <div className="divider py-8"></div>
      <div className="border rounded-3xl mb-4 p-4 shadow-xl">
        <h2 className="text-center text-4xl py-4">
          Users who have requested acess
        </h2>
        {companyUsers !== null ? (
          <div className=" overflow-auto">
            <UserList
              users={userWaitList}
              setUserWaitList={setUserWaitList}
              setCompanyUsers={setCompanyUsers}
              list="requested"
            />
          </div>
        ) : (
          <div className="mx-auto">Loading</div>
        )}
      </div>
      <div className="divider"></div>

      <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
        content
      </div>
    </div>
  );
}
