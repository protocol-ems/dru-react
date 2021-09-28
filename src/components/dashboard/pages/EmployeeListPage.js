import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "src/axiosInstance";

import UserContext from "src/components/context/UserContext";
import UserList from "src/components/dashboard/components/UserList";

export default function EmployeeListPage() {
  const { userData } = useContext(UserContext);

  const [companyUsers, setCompanyUsers] = useState(null);

  useEffect(() => {
    const getCompanyUsers = async () => {
      await axiosInstance
        .get(`/company-users/${userData.user.company}/`)
        .then((res) => {
          setCompanyUsers(res.data);
        });
    };
    getCompanyUsers();
  }, [userData.user.company]);

  return (
    <div>
      <div className="container mx-auto">
        <h2 className="text-center text-4xl pb-4">Current Employees</h2>
        <div>
          {companyUsers !== null ? (
            <div className="h-screen overflow-auto scrollbar-thumb-rounded-xl scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
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
      </div>
    </div>
  );
}
