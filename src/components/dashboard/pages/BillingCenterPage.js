import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "src/axiosInstance";
import UserContext from "src/components/context/UserContext";
import BillingCenter from "src/components/dashboard/components/payments/BillingCenter";
import { withRouter } from "react-router-dom";

function BillingCenterPage() {
  const [companyInfo, setCompanyInfo] = useState();
  const [subscriptionInfo, setSubscriptionInfo] = useState();
  const [loading, setLoading] = useState(true);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    let isUnmount = false;

    const getCompanyInfo = async () => {
      if (token !== "" && userData.user.company) {
        let companyId = userData.user.company;
        await axiosInstance.get(`company/${companyId}/`).then((res) => {
          if (!isUnmount) {
            setCompanyInfo(res.data);
          }
        });
      }
    };
    if (!isUnmount) {
      getCompanyInfo();
    }

    return () => {
      isUnmount = true;
    };
  }, [userData.user.company]);

  useEffect(() => {
    let isUnmount = false;

    const getSubscriptionDetails = async () => {
      await axiosInstance
        .get(`payments/subscription-detail/${companyInfo.subscription}/`)
        .then((res) => {
          if (!isUnmount) {
            setSubscriptionInfo(res.data);
            setLoading(false);
          }
        });
    };
    if (companyInfo && companyInfo.is_active) {
      getSubscriptionDetails();
    }
    if (companyInfo && !companyInfo.is_active) {
      setLoading(false);
      setSubscriptionInfo({});
    }

    return () => {
      isUnmount = true;
    };
  }, [companyInfo]);

  return (
    <div className="container mx-auto min-h-screen">
      <div className=" mb-4 px-4">
        <div className="text-center text-4xl pb-4 font-extrabold">
          Billing Center
        </div>
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
export default withRouter(BillingCenterPage);
