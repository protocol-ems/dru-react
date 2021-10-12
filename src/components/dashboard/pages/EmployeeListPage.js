import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "src/axiosInstance";
import { withRouter } from "react-router-dom";
import UserContext from "src/components/context/UserContext";
import UserList from "src/components/dashboard/components/UserList";

function EmployeeListPage() {
  const { userData } = useContext(UserContext);

  const [companyUsers, setCompanyUsers] = useState(null);

  useEffect(() => {
    let isUnmount = false;

    const getCompanyUsers = async () => {
      await axiosInstance
        .get(`/company-users/${userData.user.company}/`)
        .then((res) => {
          if (!isUnmount) {
            setCompanyUsers(res.data);
          }
        });
    };

    if (userData.user !== null) {
      getCompanyUsers();
    }

    return () => {
      isUnmount = true;
    };
  }, [userData]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl pb-4 font-extrabold">
          Current Employees
        </h2>
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

export default withRouter(EmployeeListPage);
