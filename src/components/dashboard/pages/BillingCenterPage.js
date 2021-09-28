import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "src/axiosInstance";
import UserContext from "src/components/context/UserContext";
import BillingCenter from "src/components/dashboard/components/payments/BillingCenter";

export default function BillingCenterPage() {
  const [companyInfo, setCompanyInfo] = useState();
  const [subscriptionInfo, setSubscriptionInfo] = useState();
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        });
    };
    if (companyInfo) {
      getSubscriptionDetails();
    }
  }, [companyInfo]);

  return (
    <div className="container mx-auto">
      <div className=" mb-4 px-4">
        <div className="text-center text-4xl pb-4">Billing Center</div>
        {loading && <div className="mx-auto loader">Loading</div>}

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
