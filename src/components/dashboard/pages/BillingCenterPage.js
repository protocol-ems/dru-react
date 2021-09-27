import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "src/axiosInstance";
import UserContext from "src/components/context/UserContext";
import BillingCenter from "src/components/dashboard/components/payments/BillingCenter";

export default function BillingCenterPage() {
  const [companyInfo, setCompanyInfo] = useState();
  const [subscriptionInfo, setSubscriptionInfo] = useState();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");

    const getCompanyInfo = async () => {
      if (token !== "" && userData.user.company) {
        let companyId = userData.user.company;
        await axiosInstance.get(`company/${companyId}/`).then((res) => {
          setCompanyInfo(res.data);
        });
      }
    };

    getCompanyInfo();
  }, [userData.user.company]);

  useEffect(() => {
    const getSubscriptionDetails = async () => {
      await axiosInstance
        .get(`payments/subscription-detail/${companyInfo.subscription}/`)
        .then((res) => {
          setSubscriptionInfo(res.data);
        });
    };
    if (companyInfo) {
      getSubscriptionDetails();
    }
  }, [companyInfo]);

  return (
    <div className="container mx-auto">
      <div className="bg-white border rounded-3xl mb-4 p-4 shadow-xl">
        <div className="text-center text-4xl py-4">Billing Center</div>
        {companyInfo && subscriptionInfo && (
          <BillingCenter
            companyInfo={companyInfo}
            subscriptionInfo={subscriptionInfo}
          />
        )}
      </div>
    </div>
  );
}
