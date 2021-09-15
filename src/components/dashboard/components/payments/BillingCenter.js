import React from "react";
import { Link } from "react-router-dom";

export default function BillingCenter({ companyInfo, subscriptionInfo }) {
  return (
    <div>
      <button
        className="btn"
        onClick={() => {
          console.log(companyInfo);
        }}
      >
        logo company info
      </button>
      <button
        className="btn"
        onClick={() => {
          console.log(subscriptionInfo);
        }}
      >
        logo sub info
      </button>
      <div className="flex flex-col md:flex-row justify-around">
        <div className="flex flex-col md:flex-row justify-around w-1/2 p-4">
          <Link
            to="/create-subscription"
            className="btn btn-accent my-4"
            onClick={() => window.scrollTo(0, 0)}
          >
            Start A Subscription
          </Link>
          <Link
            to="/change-subscription"
            className="btn btn-accent my-4"
            onClick={() => window.scrollTo(0, 0)}
          >
            Change Subscription
          </Link>
          <Link
            to="/cancel-subscription"
            className="btn btn-accent my-4"
            onClick={() => window.scrollTo(0, 0)}
          >
            Cancel Subscription
          </Link>
        </div>
        <div className="w-1/2 flex flex-col justify-around border rounded p-4">
          {" "}
          <div>Current Subscription Price:</div>
          <div>Current Max User Count:</div>
          <div>Current User Count:</div>
        </div>
      </div>
    </div>
  );
}
