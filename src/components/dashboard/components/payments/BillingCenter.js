import React from "react";
import { Link } from "react-router-dom";

import ChangeSubscription from "src/components/dashboard/components/payments/ChangeSubscription";

export default function BillingCenter({ companyInfo, subscriptionInfo }) {
  return (
    <div>
      <div className="flex flex-col  justify-around ">
        <div className="text-center flex flex-col justify-around  p-4">
          {subscriptionInfo && (
            <div>
              <div>
                Current Subscription Price: ${subscriptionInfo.price} per month
              </div>
              <div>Current Max User Count: {subscriptionInfo.user_max}</div>
              <div>Current User Count:{companyInfo.users.length}</div>
            </div>
          )}
        </div>
        <div className="mx-auto flex flex-col md:flex-row justify-around ">
          {companyInfo && companyInfo.subscription === null ? (
            <Link
              to="/create-subscription"
              className="btn btn-accent my-4"
              onClick={() => window.scrollTo(0, 0)}
            >
              Start A Subscription
            </Link>
          ) : (
            <ChangeSubscription
              companyInfo={companyInfo}
              subscriptionInfo={subscriptionInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
}
