import React, { useState, useContext } from "react";

import employeeTitle from "src/components/dashboard/components/employeeTitle";
import { axiosInstance } from "src/axiosInstance";
import UserContext from "src/components/context/UserContext";

export default function UserList({
  users,
  list,
  setCompanyUsers,
  setUserWaitList,
}) {
  // this user list takes in the users and list type to create a table with a dynamic actions.
  // the list type is used to create the possible options in the select element via a switch statement
  // Each case in the switch statement should have a default object with disbled as disabled to create a normal looking select html element
  // setUsers is a method passdown from the dashboard state - That way we can update the list after we confirm an action.

  const { userData } = useContext(UserContext);

  const initialEmployee = Object.freeze({
    employeeId: "",
    actionId: "",
  });

  const [employee, setEmployee] = useState(initialEmployee);

  const handleChange = (e) => {
    e.preventDefault();
    setEmployee({
      ...employee,
      employeeId: e.target.id,
      actionId: e.target.value,
    });
  };

  const handleSubmit = async (e, list) => {
    e.preventDefault();

    let companyId = userData.user.company;

    // patch request to make an employee a non-admin and then pushes them to company '1' which is the default non-company.
    if (list === "current" && employee.actionId === "remove") {
      await axiosInstance
        .patch(`/users/${employee.employeeId}/`, {
          employee_type: 1,
          company: 1,
        })
        .then(() => {
          axiosInstance.get(`/company-users/${companyId}/`).then((res) => {
            setCompanyUsers(res.data);
            setEmployee(initialEmployee);
          });
        });
    }
    // patch requests that changes employee type.
    if (list === "current" && employee.actionId !== "remove") {
      await axiosInstance
        .patch(`/users/${employee.employeeId}/`, {
          employee_type: employee.actionId,
        })
        .then(() => {
          axiosInstance.get(`/company-users/${companyId}/`).then((res) => {
            setCompanyUsers(res.data);
            setEmployee(initialEmployee);
          });
        });
    }
    // accepts or denys a user who is requesting access.
    if (list === "requested") {
      axiosInstance
        .patch(`/users/${employee.employeeId}/`, {
          company: employee.actionId,
          requested_company: 1,
        })
        .then(() => {
          axiosInstance.get(`/company-waitlist/${companyId}/`).then((res) => {
            setUserWaitList(res.data);
          });
        });
    }
  };

  const actionsList = (list) => {
    let companyId = userData.user.company;
    switch (list) {
      case "current":
        return [
          {
            action: "Action",
            value: "DEFAULT",
            disabled: "disabled",
          },
          {
            action: "Make EMT",
            value: 1,
          },
          {
            action: "Make Paramedic",
            value: 2,
          },
          { action: "Make RN", value: 3 },
          {
            action: "Make Admin",
            value: 4,
          },
          { action: "Make Accounting", value: 6 },
          { action: "Remove Access", value: "remove", warning: true },
        ];
      case "requested":
        return [
          {
            action: "Accept or Deny User",
            value: "DEFAULT",
            disabled: "disabled",
          },
          {
            action: "Accept",
            value: companyId,
          },
          {
            action: "Deny",
            value: 1,
            warning: true,
          },
        ];
      default:
        return [
          {
            action: "NA",
            value: "DEFAULT",
          },
          {
            action: "NA",
            value: 1,
          },
        ];
    }
  };

  return (
    <div>
      <div className="overflow-auto scrollbar-thumb-rounded-xl scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <table className="border-collapse w-full table-fixed break-word mt-12">
          <thead>
            <tr className="h-12">
              <th className=" p-1 sm:p-2 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300  lg:table-cell w-52">
                First Name
              </th>
              <th className=" p-1 sm:p-2 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300  lg:table-cell w-52">
                Last Name
              </th>
              <th className=" p-1 sm:p-2 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300  lg:table-cell w-52">
                Email
              </th>
              <th className=" p-1 sm:p-2 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300  lg:table-cell w-52">
                Title
              </th>
              <th className=" p-1 sm:p-2 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300  lg:table-cell w-52">
                Action
              </th>
              <th className=" p-1 sm:p-2 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300  lg:table-cell w-52">
                confirm
              </th>
            </tr>
          </thead>
          <tbody>
            {users !== null ? (
              users.map((user) => {
                return (
                  <tr className="border even:bg-gray-50" key={user.id}>
                    <td className="border min-h-12 min-w-12 break-all p-1 sm:p-2">
                      {user.first_name}
                    </td>
                    <td className="border min-h-12 min-w-12 break-all p-1 sm:p-2">
                      {user.last_name}
                    </td>
                    <td className="border min-h-12 min-w-12 break-all p-1 sm:p-2">
                      {user.username}
                    </td>
                    <td className="border min-h-12 min-w-12 break-all p-1 sm:p-2">
                      {employeeTitle(user.employee_type)}
                    </td>
                    <td className="border">
                      <select
                        defaultValue={"DEFAULT"}
                        className="select w-full"
                        onChange={handleChange}
                        id={user.id}
                      >
                        {actionsList(list).map((action) => {
                          return (
                            <option
                              key={action.value}
                              value={action.value}
                              disabled={action.disabled}
                              className={
                                action.warning ? "text-red-600" : "bg-white"
                              }
                            >
                              {action.action}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td className="flex justify-center">
                      {parseInt(employee.employeeId) === user.id ? (
                        <button
                          id={user.id}
                          className="btn"
                          onClick={(e) => handleSubmit(e, list)}
                        >
                          submit
                        </button>
                      ) : (
                        <button className="btn btn-disabled">Submit</button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>
                  <div className="loader">loading</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
