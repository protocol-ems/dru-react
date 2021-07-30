import React from "react";
import { Link } from "react-router-dom";
import employeeTitle from "./employeeTitle";

export default function UserList({ companyUsers }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {companyUsers !== null
              ? companyUsers.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.username}</td>
                      <td>{employeeTitle(user.employeeType)}</td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
      <Link>Add Users</Link>
    </div>
  );
}
