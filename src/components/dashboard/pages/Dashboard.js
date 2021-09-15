import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { axiosInstance } from "../../../axios";
import { useHistory } from "react-router-dom";
import CreateOrJoinHeader from "../components/CreateOrJoinHeader";
import DashboardContent from "../components/DashboardContent";

export default function Dashboard() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const [companyInfo, setCompanyInfo] = useState();
  const [subscriptionInfo, setSubscriptionInfo] = useState();
  const [companyUsers, setCompanyUsers] = useState(null);
  const [userWaitList, setUserWaitList] = useState(null);
  const [companyDocuments, setCompanyDocuments] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    const getCompanyInfo = async () => {
      if (token !== "" && userData.user.company) {
        let companyId = userData.user.company;
        await axiosInstance
          .get(`company/${companyId}/`)
          .then((res) => setCompanyInfo(res.data));

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
    if (userData.user !== null && userData.user.employee_type === 4) {
      // getCompanyInfo().then(() => getCompanyDocuments());
      getCompanyDocuments().then(() => getCompanyInfo());
    }
    if (userData.user !== null && userData.user.employee_type !== 4) {
      getCompanyDocuments();
    }
    if (token === "null" && !userData.user) {
      history.push("/login");
    }
  }, [userData.user, userData, history]);

  useEffect(() => {
    const getSubscriptionDetails = async () => {
      await axiosInstance
        .get(`payments/subscription-detail/${companyInfo.subscription}/`)
        .then((res) => {
          setSubscriptionInfo(res.data);
        });
    };
    if (companyInfo && companyInfo.subscription !== null) {
      getSubscriptionDetails();
    }
  }, [companyInfo]);

  return (
    <div className="container mx-auto ">
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
          companyInfo={companyInfo}
          subscriptionInfo={subscriptionInfo}
        />
      )}
    </div>
  );
}
