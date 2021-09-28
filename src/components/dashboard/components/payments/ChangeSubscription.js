import React, { useState, useEffect } from "react";

import ApiService, { axiosInstance } from "src/axiosInstance";

export default function ChangeSubscription({ companyInfo, subscriptionInfo }) {
  const [changeSubscription, setChangeSubscription] = useState(false);

  const [subscriptionTiers, setSubscriptionTiers] = useState();

  const [newSubscription, setNewSubscription] = useState();

  useEffect(() => {
    const getSubscriptionTiers = async () => {
      await axiosInstance.get("/payments/subscriptions/").then((res) => {
        setSubscriptionTiers(res.data);
      });
    };
    getSubscriptionTiers();
  }, [changeSubscription]);

  const handleSubscriptionChange = (e) => {
    e.preventDefault();
    setNewSubscription(e.target.value);
  };

  const handleSubscriptionSubmit = (e) => {
    e.preventDefault();
    // axios request to change subscription
    // checks to make sure current subscription does not match the new one
    if (parseInt(newSubscription) === subscriptionInfo.id) {
      console.log("You are already have this subscription Tier");
    }

    if (parseInt(newSubscription) !== subscriptionInfo.id) {
      ApiService.changeSubscription({
        subscription_type_id: newSubscription,
        stripe_cus_id: companyInfo.stripe_cus_id,
        stripe_sub_id: companyInfo.stripe_sub_id,
        company: companyInfo.id,
      });
    }
  };
  return (
    <div className="w-full">
      {!changeSubscription && (
        <button className="btn" onClick={() => setChangeSubscription(true)}>
          Change Subscription?
        </button>
      )}
      {changeSubscription && (
        <form>
          <label className="label" htmlFor="name">
            OurProtcol Tier
          </label>
          <select
            defaultValue={"DEFAULT"}
            className="select select-bordered select-accent w-full"
            onChange={(e) => handleSubscriptionChange(e)}
          >
            <option value="DEFAULT" disabled="disabled">
              Select your tier
            </option>
            {subscriptionTiers &&
              subscriptionTiers.map((tier) => {
                return (
                  <option value={tier.id} key={tier.id}>
                    {`${tier.user_max} max users at $${tier.price} per month`}
                  </option>
                );
              })}
          </select>
          <button
            className="btn"
            onClick={(e) => {
              handleSubscriptionSubmit(e);
            }}
          >
            Change Subscription
          </button>
        </form>
      )}
    </div>
  );
}
