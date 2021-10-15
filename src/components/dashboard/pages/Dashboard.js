import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "src/components/context/UserContext";
import { axiosInstance } from "src/axiosInstance";
import CreateOrJoinHeader from "src/components/dashboard/components/CreateOrJoinHeader";
import DashboardContent from "src/components/dashboard/components/DashboardContent";

export default function Dashboard() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const [companyDocuments, setCompanyDocuments] = useState([]);

  // This is the heart of the app
  // First we check auth of the user -> it will redirect to login on fail
  // If the user is good - then it will show either a join company / create company screen if the user is not in a company or it will show the main dashboard view.
  // if the user is a part of a company, it sets a few props the drill down through the app.
  // CompanyInfo shows us all of the specifics to the company but not the detail of each item. For example, it shows all user id's but not each users' details.
  // subscriptionInfo - a break down of company's subscription status and values - will be used to set user cap on the front end and display costs
  // company users and user waitlist are set to show who is in the company and who is trying to get in
  // company documents is the details of each document and is passed down as a prop to be used.

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    let isUnmount = false;

    const getCompanyDocuments = async () => {
      if (token !== "") {
        let companyId = userData.user.company || 1;
        await axiosInstance
          .get(`company-documents/${companyId}/`)
          .then((res) => {
            if (!isUnmount) {
              setCompanyDocuments(res.data);
              localStorage.setItem("documents", JSON.stringify(res.data));
            }
          });
      }
    };

    if (!isUnmount && userData && userData.user !== null) {
      getCompanyDocuments();
    }

    return () => {
      isUnmount = true;
    };
  }, [userData.user, userData, history]);

  return (
    <div>
      <div className="container mx-auto">
        {userData.user !== null && userData.user.company === 1 ? (
          <CreateOrJoinHeader />
        ) : (
          <DashboardContent
            companyDocuments={companyDocuments}
            setCompanyDocuments={setCompanyDocuments}
            offline={false}
          />
        )}
      </div>
    </div>
  );
}
