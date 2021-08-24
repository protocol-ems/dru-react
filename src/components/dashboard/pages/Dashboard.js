import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { axiosInstance } from "../../../axios";

import CreateOrJoinHeader from "../components/CreateOrJoinHeader";
import DashboardContent from "../components/DashboardContent";

export default function Dashboard() {
  const { userData } = useContext(UserContext);

  const [companyUsers, setCompanyUsers] = useState(null);
  const [userWaitList, setUserWaitList] = useState(null);
  const [companyDocuments, setCompanyDocuments] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    const getCompanyInfo = async () => {
      if (token !== "" && userData.user.company) {
        let companyId = userData.user.company;
        await axiosInstance
          .get(`/company-users/${companyId}/`)
          .then((res) => {
            setCompanyUsers(res.data);
          })

          .then(() => {
            axiosInstance.get(`/company-waitlist/${companyId}/`).then((res) => {
              setUserWaitList(res.data);
            });
          });
      }
    };
    const getCompanyDocuments = async () => {
      if (token !== "") {
        let companyId = userData.user.company || 1;
        await axiosInstance
          .get(`company-documents/${companyId}/`)
          .then((res) => {
            setCompanyDocuments(res.data);
          });
      }
    };
    if (userData.user !== null) {
      getCompanyInfo().then(() => getCompanyDocuments());
    }
  }, [userData.user]);

  return (
    <div className="container mx-auto mt-12 ">
      <h1 className="text-5xl mx-auto">Dashboard</h1>
      {userData.user !== null ? (
        <h1>Currently logged in as: {userData.user.username}</h1>
      ) : (
        "Please log in"
      )}

      {/* <button className="btn" onClick={() => console.log(userData.user)}>
        click
      </button> */}
      {userData.user !== null && userData.user.company === 1 ? (
        <CreateOrJoinHeader />
      ) : (
        <DashboardContent
          companyUsers={companyUsers}
          setCompanyUsers={setCompanyUsers}
          userWaitList={userWaitList}
          setUserWaitList={setUserWaitList}
          companyDocuments={companyDocuments}
          setCompanyDocuments={setCompanyDocuments}
        />
      )}
    </div>
  );
}
