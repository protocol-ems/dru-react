import React from "react";
import UserList from "../components/UserList";

export default function DashboardContent({ companyUsers }) {
  return (
    <div className="flex flex-col w-full pt-24">
      <div className="grid h-48 card  rounded-box overflow-auto">
        {companyUsers !== null ? (
          <UserList companyUsers={companyUsers} />
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
