import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { axiosInstance } from "../../../axios";

import CreateOrJoinHeader from "../components/CreateOrJoinHeader";
import DashboardContent from "../components/DashboardContent";

export default function Dashboard() {
  const { userData } = useContext(UserContext);

  const [companyUsers, setCompanyUsers] = useState(null);

  useEffect(() => {
    const getCompanyInfo = async () => {
      let token = localStorage.getItem("Authorization");

      if (token !== "" && userData.user.company) {
        let companyId = userData.user.company;
        await axiosInstance
          .get(`/company-users/${companyId}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            setCompanyUsers(res.data);
          });
      }
    };
    if (userData.user !== null) {
      getCompanyInfo();
    }
    //      getCompanyInfo();
  }, [userData.user]);

  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-5xl mx-auto">Dashboard</h1>
      {userData.user !== null ? (
        <h1>Currently logged in as: {userData.user.username}</h1>
      ) : (
        "Please log in"
      )}

      <button className="btn" onClick={() => console.log(userData.user)}>
        click
      </button>
      {userData.user.company === 1 ? (
        <CreateOrJoinHeader />
      ) : (
        <DashboardContent companyUsers={companyUsers} />
      )}
    </div>
  );
}
