import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "src/axiosInstance";

import UserContext from "src/components/context/UserContext";
import UserList from "src/components/dashboard/components/UserList";

export default function WaitListPage() {
  const { userData } = useContext(UserContext);

  const [userWaitList, setUserWaitList] = useState(null);

  useEffect(() => {
    const getCompanyUsers = async () => {
      await axiosInstance
        .get(`/company-waitlist/${userData.user.company}/`)
        .then((res) => {
          setUserWaitList(res.data);
        });
    };
    getCompanyUsers();
  }, [userData.user.company]);

  return (
    <div>
      <div className="container mx-auto">
        <h2 className="text-center text-4xl py-4">Wait List</h2>
        {userWaitList !== null ? (
          <div className=" h-64 overflow-auto scrollbar-thumb-rounded-xl scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <UserList
              users={userWaitList}
              setUserWaitList={setUserWaitList}
              list="requested"
            />
          </div>
        ) : (
          <div className="mx-auto loader">Loading</div>
        )}
      </div>
    </div>
  );
}
