import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { axiosInstance } from "../../../axios";

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

    getCompanyInfo();
  }, []);

  return (
    <div>
      <div>Main Dashboard</div>

      {userData.user !== null ? (
        <h1>Currently logged in as: {userData.user.username}</h1>
      ) : (
        "Please log in"
      )}

      <button onClick={() => console.log(userData.user)}>click</button>
    </div>
  );
}
