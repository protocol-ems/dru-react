import React from "react";
import { Link } from "react-router-dom";

import ChangeSubscription from "src/components/dashboard/components/payments/ChangeSubscription";

export default function BillingCenter({ companyInfo, subscriptionInfo }) {
  return (
    <div>
      <div className="flex flex-col justify-between ">
        <div className="text-center flex flex-col justify-around mt-24 md:mt-4">
          {subscriptionInfo && (
            <div className="flex flex-col md:flex-row mx-auto w-full justify-between md:justify-center  min-h-96 ">
              <div className=" bg-accent md:w-1/3 border min-h-96 rounded-3xl shadow-lg text-white ">
                <div className="w-full flex flex-col bg-gradient-to-br from-purple-600 to-purple-500 h-full rounded-3xl m-4 border">
                  <div className=" text-left p-12 text-3xl font-bold ">
                    Current Subscription Price
                  </div>
                  <div className="text-left px-12 text-2xl text-gray-200">
                    ${subscriptionInfo.price || 0} per month
                  </div>
                  <div className="flex justify-end p-12">
                    {subscriptionInfo.price ? (
                      <ChangeSubscription
                        companyInfo={companyInfo}
                        subscriptionInfo={subscriptionInfo}
                      />
                    ) : (
                      <Link
                        to="/create-subscription"
                        className="btn glass  text-gray-100 "
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Start A Subscription
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className=" bg-accent md:w-1/3 border rounded-3xl shadow-lg text-white md:mx-12 mt-12 md:mt-0 min-h-96">
                <div className="w-full flex flex-col bg-gradient-to-br from-purple-600 to-purple-500  rounded-3xl m-4 border h-full">
                  <div className=" text-left p-12 text-3xl font-bold ">
                    Employees
                  </div>
                  <div className="text-left px-12 py-4 text-2xl text-gray-200">
                    Current User Count: {companyInfo.users.length}
                  </div>
                  <div className="text-left px-12 text-2xl text-gray-200">
                    Max User Count: {subscriptionInfo.user_max || 1}
                  </div>
                  <div className="flex justify-end p-12">
                    <Link
                      to="/employee-list"
                      className="btn glass text-gray-100 "
                    >
                      View Employees
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
